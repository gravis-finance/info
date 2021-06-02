import React, { useState, useEffect, useRef, useMemo } from 'react'
import dayjs from 'dayjs'
import { formattedNum } from '../../utils'
import { usePrevious } from 'react-use'
import styled from 'styled-components'
import { Play } from 'react-feather'
import { useDarkModeManager } from '../../contexts/LocalStorage'

const IconWrapper = styled.div`
  position: absolute;
  right: 51px;
  color: #009ce1;
  border-radius: 3px;
  height: 16px;
  width: 16px;
  padding: 0px;
  bottom: 23px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const CandleStickChart = ({
  data,
  width,
  height = 300,
  base,
  margin = true,
  valueFormatter = (val) => formattedNum(val, true),
}) => {
  // reference for DOM element to create with chart
  const ref = useRef()

  const formattedData = useMemo(() => {
    const result = data?.map((entry) => {
      return {
        time: parseFloat(entry.timestamp),
        open: parseFloat(entry.open),
        low: parseFloat(entry.open),
        close: parseFloat(entry.close),
        high: parseFloat(entry.close),
      }
    })

    if (result && result.length > 0) {
      result.push({
        time: dayjs().unix(),
        open: parseFloat(result[result.length - 1].close),
        close: parseFloat(base),
        low: Math.min(parseFloat(base), parseFloat(result[result.length - 1].close)),
        high: Math.max(parseFloat(base), parseFloat(result[result.length - 1].close)),
      })
    }

    return result
  }, [base, data])

  // pointer to the chart object
  const [chartCreated, setChartCreated] = useState(false)
  const dataPrev = usePrevious(data)

  const [darkMode] = useDarkModeManager()
  const textColor = darkMode ? 'white' : 'black'
  const previousTheme = usePrevious(darkMode)

  // reset the chart if theme switches
  useEffect(() => {
    if (chartCreated && previousTheme !== darkMode) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id')
      let node = document.getElementById('test-id')
      node.removeChild(tooltip)
      chartCreated.resize(0, 0)
      setChartCreated()
    }
  }, [chartCreated, darkMode, previousTheme])

  useEffect(() => {
    if (data !== dataPrev && chartCreated) {
      // remove the tooltip element
      let tooltip = document.getElementById('tooltip-id')
      let node = document.getElementById('test-id')
      node.removeChild(tooltip)
      chartCreated.resize(0, 0)
      setChartCreated()
    }
  }, [chartCreated, data, dataPrev])

  // if no chart created yet, create one with options and add to DOM manually
  useEffect(() => {
    if (!chartCreated) {
      import('lightweight-charts').then(({ createChart, CrosshairMode }) => {
        if (ref.current) {
          const chart = createChart(ref.current, {
            width: width,
            height: height,
            layout: {
              backgroundColor: 'transparent',
              textColor: 'rgba(255, 255, 255, 0.5)',
            },
            grid: {
              vertLines: {
                color: 'rgba(197, 203, 206, 0.5)',
              },
              horzLines: {
                color: 'rgba(197, 203, 206, 0.5)',
              },
            },
            crosshair: {
              mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
              borderColor: 'rgba(197, 203, 206, 0.8)',
              visible: true,
            },
            timeScale: {
              borderColor: 'rgba(197, 203, 206, 0.8)',
            },
            localization: {
              priceFormatter: (val) => formattedNum(val),
            },
          })

          const candleSeries = chart.addCandlestickSeries({
            upColor: '#009CE1',
            downColor: '#FFA100',
            borderDownColor: '#FFA100',
            borderUpColor: '#009CE1',
            wickDownColor: '#FFA100',
            wickUpColor: '#009CE1',
          })

          candleSeries.setData(formattedData)

          const toolTip = document.createElement('div')
          toolTip.setAttribute('id', 'tooltip-id')
          toolTip.className = 'three-line-legend'
          ref.current.appendChild(toolTip)
          toolTip.style.display = 'block'
          toolTip.style.left = (margin ? 150 : 10) + 'px'
          toolTip.style.width = '60%'
          toolTip.style.top = 50 + 'px'
          toolTip.style.backgroundColor = 'transparent'

          // get the title of the chart
          function setLastBarText() {
            toolTip.innerHTML = base
              ? `<div style="font-size: 22px; margin: 4px 0px; color: white">` + valueFormatter(base) + '</div>'
              : ''
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
              param.point.y > height
            ) {
              setLastBarText()
            } else {
              var price = param.seriesPrices.get(candleSeries).close
              const time = dayjs.unix(param.time).format('MM/DD h:mm A')
              toolTip.innerHTML =
                `<div style="font-size: 22px; margin: 4px 0px; color: white">` +
                valueFormatter(price) +
                `<span style="font-size: 12px; margin: 4px 6px; color: white">` +
                time +
                ' UTC' +
                '</span>' +
                '</div>'
            }
          })

          chart.timeScale().fitContent()

          setChartCreated(chart)
        }
      })
    }
  }, [chartCreated, formattedData, width, height, valueFormatter, base, margin, textColor])

  // responsiveness
  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, height)
      chartCreated && chartCreated.timeScale().scrollToPosition(0)
    }
  }, [chartCreated, height, width])

  return (
    <div>
      <div ref={ref} id="test-id" />
      <IconWrapper>
        <Play
          onClick={() => {
            chartCreated && chartCreated.timeScale().fitContent()
          }}
        />
      </IconWrapper>
    </div>
  )
}

export default CandleStickChart
