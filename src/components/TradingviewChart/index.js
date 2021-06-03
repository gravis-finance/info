import React, { useState, useEffect, useRef, memo, useMemo } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { formattedNum } from '../../utils'
import styled from 'styled-components'
import { usePrevious } from 'react-use'
import { Play } from 'react-feather'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import { IconWrapper } from '..'
import { useTranslation } from 'react-multi-lang'

dayjs.extend(utc)

export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA',
}

const Wrapper = styled.div`
  position: relative;
  padding-right: 30px;
`

// constant height for charts
const HEIGHT = 300

const TradingViewChart = ({
  type = CHART_TYPES.BAR,
  data,
  base,
  baseChange,
  field,
  title,
  width,
  useWeekly = false,
}) => {
  // reference for DOM element to create with chart
  const ref = useRef()

  // pointer to the chart object
  const [chartCreated, setChartCreated] = useState(false)
  const dataPrev = usePrevious(data)

  useEffect(() => {
    if (data !== dataPrev && chartCreated && type === CHART_TYPES.BAR) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id' + type)
      let node = document.getElementById('test-id' + type)
      node.removeChild(tooltip)
      chartCreated.resize(0, 0)
      setChartCreated()
    }
  }, [chartCreated, data, dataPrev, type])

  // parese the data and format for tardingview consumption
  const formattedData = useMemo(
    () =>
      data?.map((entry) => {
        return {
          time: dayjs.unix(entry.date).utc().format('YYYY-MM-DD'),
          value: parseFloat(entry[field]),
        }
      }),
    [data, field]
  )

  // adjust the scale based on the type of chart
  const topScale = type === CHART_TYPES.AREA ? 0.32 : 0.2

  const [darkMode] = useDarkModeManager()
  const previousTheme = usePrevious(darkMode)

  const t = useTranslation()

  // reset the chart if them switches
  useEffect(() => {
    if (chartCreated && previousTheme !== darkMode) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id' + type)
      let node = document.getElementById('test-id' + type)
      node.removeChild(tooltip)
      chartCreated.resize(0, 0)
      setChartCreated()
    }
  }, [chartCreated, darkMode, previousTheme, type])

  // if no chart created yet, create one with options and add to DOM manually
  useEffect(() => {
    const current = ref.current
    if (!chartCreated && formattedData) {
      import('lightweight-charts').then(({ createChart }) => {
        if (current) {
          const chart = createChart(current, {
            width: width,
            height: HEIGHT,
            layout: {
              backgroundColor: 'transparent',
              textColor: 'rgba(255, 255, 255, 0.5)',
            },
            rightPriceScale: {
              scaleMargins: {
                top: topScale,
                bottom: 0,
              },
              borderVisible: false,
            },
            timeScale: {
              borderVisible: false,
            },
            grid: {
              horzLines: {
                color: '#009CE1',
                visible: false,
              },
              vertLines: {
                color: '#009CE1',
                visible: false,
              },
            },
            crosshair: {
              horzLine: {
                visible: false,
                labelVisible: false,
                color: '#009CE1',
              },
              vertLine: {
                visible: true,
                style: 0,
                width: 2,
                color: '#009CE1',
                labelVisible: false,
              },
            },
            localization: {
              priceFormatter: (val) => formattedNum(val, true),
            },
          })

          const series =
            type === CHART_TYPES.BAR
              ? chart.addHistogramSeries({
                  color: '#009CE1',
                  priceFormat: {
                    type: 'volume',
                  },
                  scaleMargins: {
                    top: 0.32,
                    bottom: 0,
                  },
                  lineColor: '#009CE1',
                  lineWidth: 3,
                })
              : chart.addAreaSeries({
                  topColor: '#009CE1',
                  bottomColor: 'rgba(0, 156, 225, 0)',
                  lineColor: '#009CE1',
                  lineWidth: 3,
                })

          series.setData(formattedData)
          const toolTip = document.createElement('div')
          toolTip.setAttribute('id', 'tooltip-id' + type)
          toolTip.className = darkMode ? 'three-line-legend-dark' : 'three-line-legend'
          current.appendChild(toolTip)
          toolTip.style.display = 'block'
          toolTip.style.fontWeight = '500'
          toolTip.style.left = -4 + 'px'
          toolTip.style.top = '-' + 8 + 'px'
          toolTip.style.backgroundColor = 'transparent'

          // format numbers
          const percentChange = baseChange?.toFixed(2)
          const formattedPercentChange =
            percentChange !== undefined ? (percentChange > 0 ? '+' : '') + percentChange + '%' : ''
          const color = percentChange >= 0 ? '#009CE1' : '#FFA100'
          // get the title of the chart
          function setLastBarText() {
            toolTip.innerHTML =
              `<div style="font-size: 16px; margin: 13px 0 4px 8px; color: #FFFFFF; font-weight: 500; letter-spacing: 1px">${title} ${
                type === CHART_TYPES.BAR && !useWeekly ? `(${t('24hr')})` : ''
              }</div>` +
              `<div style="font-size: 22px; margin: 4px 0 4px 8px; color: #FFFFFF;" >` +
              formattedNum(base ?? 0, true) +
              `<span style="margin-left: 10px; font-size: 16px; color: ${color};">${
                formattedPercentChange ?? 0
              }</span>` +
              '</div>'
          }
          setLastBarText()

          // update the title when hovering on the chart
          chart.subscribeCrosshairMove(function (param) {
            if (
              param === undefined ||
              param.time === undefined ||
              param.point.x < 0 ||
              param.point.x > width ||
              param.point.y < 0 ||
              param.point.y > HEIGHT
            ) {
              setLastBarText()
            } else {
              let dateStr = useWeekly
                ? dayjs(param.time.year + '-' + param.time.month + '-' + param.time.day)
                    .startOf('week')
                    .format('MMMM D, YYYY') +
                  '-' +
                  dayjs(param.time.year + '-' + param.time.month + '-' + param.time.day)
                    .endOf('week')
                    .format('MMMM D, YYYY')
                : dayjs(param.time.year + '-' + param.time.month + '-' + param.time.day).format('MMMM D, YYYY')
              var price = param.seriesPrices.get(series)

              toolTip.innerHTML =
                `<div style="font-size: 16px; margin: 13px 0 4px 8px; color: #FFFFFF; font-weight: 500; letter-spacing: 1px">${title}</div>` +
                `<div style="font-size: 22px; margin: 0 0 4px 8px; color: #FFFFFF">` +
                formattedNum(price, true) +
                '</div>' +
                '<div style="font-size: 12px; margin: 0 0 4px 8px; color: #FFFFFF">' +
                dateStr +
                '</div>'
            }
          })

          chart.timeScale().fitContent()

          setChartCreated(chart)
        }
      })
    }
  }, [t, base, baseChange, chartCreated, darkMode, formattedData, title, topScale, type, useWeekly, width])

  // responsiveness
  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, HEIGHT)
      chartCreated && chartCreated.timeScale().scrollToPosition(0)
    }
  }, [chartCreated, width])

  return (
    <Wrapper>
      <div ref={ref} id={'test-id' + type} />
      <IconWrapper>
        <Play
          onClick={() => {
            chartCreated && chartCreated.timeScale().fitContent()
          }}
        />
      </IconWrapper>
    </Wrapper>
  )
}

export default memo(TradingViewChart)
