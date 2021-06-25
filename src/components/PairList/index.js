import React, { useState, useEffect, memo, useCallback, useMemo } from 'react'
import { useMedia } from 'react-use'
import dayjs from 'dayjs'
import LocalLoader from '../LocalLoader'
import utc from 'dayjs/plugin/utc'
import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'

import { CustomLink } from '../Link'
import { Divider } from '../../components'
import { withRouter } from 'react-router-dom'
import { formattedNum, formattedPercent } from '../../utils'
import DoubleTokenLogo from '../DoubleLogo'
import FormattedName from '../FormattedName'
import QuestionHelper from '../QuestionHelper'
import { PagePicker } from '../Page'
import SortDirection from '../SortDirection'
import { useTranslation } from 'react-multi-lang'

dayjs.extend(utc)

const List = styled(Box)`
  -webkit-overflow-scrolling: touch;
  padding: 2px 7px 23px 7px !important;
`

const DashGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 100px 1fr 1fr;
  grid-template-areas: 'name liq vol';

  ${(props) =>
    props.isHeader
      ? `
    padding: 21px 16px;
    background: #353535;
    border-radius: 6px;
    margin: 7px;`
      : ''}

  > * {
    justify-content: flex-end;

    &:first-child {
      justify-content: flex-start;
      text-align: left;
      width: 100px;
    }
  }

  @media screen and (min-width: 680px) {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 180px 1fr 1fr 1fr;
    grid-template-areas: 'name symbol liq vol ';

    > * {
      justify-content: flex-end;
      width: 100%;

      &:first-child {
        justify-content: flex-start;
      }
    }
  }

  @media screen and (min-width: 1080px) {
    display: grid;
    grid-gap: 0.5em;
    grid-template-rows: 14px;
    grid-template-columns: 1.75fr 1fr 1fr 1fr 0.6fr 1fr;
    grid-template-areas: 'name symbol liq vol price change';
    place-content: center;
  }
`

const ListWrapper = styled.div``

const ClickableText = styled(Text)`
  white-space: pre;
  text-align: end;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  user-select: none;
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;

  @media screen and (max-width: 640px) {
    font-size: 0.85rem;
    white-space: initial;
  }
`

const DataText = styled(Flex)`
  align-items: center;
  text-align: center;
  justify-content: left;
  color: ${({ theme }) => theme.text1};

  & > * {
    font-size: 14px;
    font-weight: 400 !important;
  }

  &:last-child {
    justify-content: flex-end;
  }

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

const SORT_FIELD = {
  LIQ: 0,
  VOL: 1,
  VOL_7DAYS: 3,
  FEES: 4,
  APY: 5,
}

const FIELD_TO_VALUE = {
  [SORT_FIELD.LIQ]: 'trackedReserveUSD', // sort with tracked volume only
  [SORT_FIELD.VOL]: 'oneDayVolumeUSD',
  [SORT_FIELD.VOL_7DAYS]: 'oneWeekVolumeUSD',
  [SORT_FIELD.FEES]: 'oneDayVolumeUSD',
}

function PairList({ pairs, color, disbaleLinks, maxItems = 10 }) {
  const below680 = useMedia('(max-width: 680px)')
  const below740 = useMedia('(max-width: 740px)')
  const below1080 = useMedia('(max-width: 1080px)')

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const ITEMS_PER_PAGE = maxItems

  // sorting
  const [sortDirection, setSortDirection] = useState(true)
  const [sortedColumn, setSortedColumn] = useState(SORT_FIELD.LIQ)

  const t = useTranslation()

  useEffect(() => {
    setMaxPage(1) // edit this to do modular
    setPage(1)
  }, [pairs])

  useEffect(() => {
    if (pairs) {
      let extraPages = 1
      if (Object.keys(pairs).length % ITEMS_PER_PAGE === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(Object.keys(pairs).length / ITEMS_PER_PAGE) + extraPages)
    }
  }, [ITEMS_PER_PAGE, pairs])

  const ListItem = useCallback(
    ({ pairAddress, index }) => {
      const pairData = pairs[pairAddress]

      if (pairData && pairData.token0 && pairData.token1) {
        const liquidity = formattedNum(pairData.reserveUSD, true)
        const volume = formattedNum(pairData.oneDayVolumeUSD, true)
        const apy = formattedPercent((pairData.oneDayVolumeUSD * 0.002 * 365 * 100) / pairData.reserveUSD)

        return (
          <DashGrid
            style={{ height: '56px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '0 16px' }}
            disbaleLinks={disbaleLinks}
            focus={true}
          >
            <DataText area="name" fontWeight="500">
              {!below680 && <div style={{ marginRight: '20px', width: '10px' }}>{index}</div>}
              <DoubleTokenLogo
                size={below680 ? 16 : 20}
                a0={pairData.token0.id}
                a1={pairData.token1.id}
                margin={!below740}
              />
              <CustomLink
                style={{ marginLeft: '9px', whiteSpace: 'nowrap' }}
                to={'/pair/' + pairAddress + window.location.search}
                color={color}
              >
                <FormattedName
                  text={pairData.token0.symbol + '-' + pairData.token1.symbol}
                  maxCharacters={below680 ? 8 : 16}
                  adjustSize={true}
                  link={true}
                  style={{ fontWeight: '500' }}
                />
              </CustomLink>
            </DataText>
            <DataText area="liq">{liquidity}</DataText>
            <DataText area="vol">{volume}</DataText>
            {!below1080 && <DataText area="volWeek">{formattedNum(pairData.oneWeekVolumeUSD, true)}</DataText>}
            {!below1080 && <DataText area="fees">{formattedNum(pairData.oneDayVolumeUSD * 0.002, true)}</DataText>}
            {!below1080 && (
              <DataText area="apy" style={{ justifyContent: 'flex-end' }}>
                {apy}
              </DataText>
            )}
          </DashGrid>
        )
      } else {
        return ''
      }
    },
    [below1080, below680, below740, color, disbaleLinks, pairs]
  )

  const pairList = useMemo(
    () =>
      pairs &&
      Object.keys(pairs)
        .sort((addressA, addressB) => {
          const pairA = pairs[addressA]
          const pairB = pairs[addressB]
          if (sortedColumn === SORT_FIELD.APY) {
            const apy0 = parseFloat(pairA.oneDayVolumeUSD * 0.002 * 356 * 100) / parseFloat(pairA.reserveUSD)
            const apy1 = parseFloat(pairB.oneDayVolumeUSD * 0.002 * 356 * 100) / parseFloat(pairB.reserveUSD)
            return apy0 > apy1 ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1
          }
          return parseFloat(pairA[FIELD_TO_VALUE[sortedColumn]]) > parseFloat(pairB[FIELD_TO_VALUE[sortedColumn]])
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1
        })
        .slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE)
        .map((pairAddress, index) => {
          return (
            pairAddress && (
              <div key={index}>
                <ListItem key={index} index={(page - 1) * ITEMS_PER_PAGE + index + 1} pairAddress={pairAddress} />
                <Divider />
              </div>
            )
          )
        }),
    [ITEMS_PER_PAGE, page, pairs, sortDirection, sortedColumn, ListItem] // eslint-disable-line
  )

  return (
    <ListWrapper>
      <DashGrid center={true} disbaleLinks={disbaleLinks} style={{ height: 'fit-content' }} isHeader={true}>
        <Flex alignItems="center" justifyContent="flexStart">
          <ClickableText
            area="name"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.NAME)
              setSortDirection(sortedColumn !== SORT_FIELD.NAME ? true : !sortDirection)
            }}
          >
            {t('name')} <SortDirection found={sortedColumn === SORT_FIELD.NAME} sortDirection={sortDirection} />
          </ClickableText>
        </Flex>
        <Flex alignItems="center" justifyContent="left">
          <ClickableText
            area="liq"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.LIQ)
              setSortDirection(sortedColumn !== SORT_FIELD.LIQ ? true : !sortDirection)
            }}
          >
            {t('liquidity')} <SortDirection found={sortedColumn === SORT_FIELD.LIQ} sortDirection={sortDirection} />
          </ClickableText>
        </Flex>
        <Flex alignItems="center" justifyContent="left">
          <ClickableText
            area="vol"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.VOL)
              setSortDirection(sortedColumn !== SORT_FIELD.VOL ? true : !sortDirection)
            }}
          >
            {t('volume24hrs')} {sortedColumn === SORT_FIELD.VOL && <SortDirection found={sortedColumn === SORT_FIELD.VOL} sortDirection={sortDirection} />}
          </ClickableText>
        </Flex>
        {!below1080 && (
          <Flex alignItems="center" justifyContent="left">
            <ClickableText
              area="volWeek"
              onClick={(e) => {
                setSortedColumn(SORT_FIELD.VOL_7DAYS)
                setSortDirection(sortedColumn !== SORT_FIELD.VOL_7DAYS ? true : !sortDirection)
              }}
            >
              {t('volume7D')}{' '}
              <SortDirection found={sortedColumn === SORT_FIELD.VOL_7DAYS} sortDirection={sortDirection} />
            </ClickableText>
          </Flex>
        )}
        {!below1080 && (
          <Flex alignItems="center" justifyContent="left">
            <ClickableText
              area="fees"
              onClick={(e) => {
                setSortedColumn(SORT_FIELD.FEES)
                setSortDirection(sortedColumn !== SORT_FIELD.FEES ? true : !sortDirection)
              }}
            >
              {t('fees24hrs')} <SortDirection found={sortedColumn === SORT_FIELD.FEES} sortDirection={sortDirection} />
            </ClickableText>
          </Flex>
        )}
        {!below1080 && (
          <Flex alignItems="center" justifyContent="flex-end">
            <ClickableText
              area="apy"
              onClick={(e) => {
                setSortedColumn(SORT_FIELD.APY)
                setSortDirection(sortedColumn !== SORT_FIELD.APY ? true : !sortDirection)
              }}
            >
              {t('1yFeesLiquidity')}{' '}
              <SortDirection found={sortedColumn === SORT_FIELD.APY} sortDirection={sortDirection} />
            </ClickableText>
            <QuestionHelper text={t('basedOnVolume')} />
          </Flex>
        )}
      </DashGrid>
      <Divider />
      <List p={0}>{!pairList || pairList.length === 0 ? <LocalLoader /> : pairList}</List>
      <PagePicker
        onBackClick={() => setPage(page === 1 ? page : page - 1)}
        onNextClick={() => setPage(page === maxPage ? page : page + 1)}
        page={page}
        maxPage={maxPage}
      />
    </ListWrapper>
  )
}

export default withRouter(memo(PairList))
