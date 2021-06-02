import React, { useState, useEffect, useMemo, memo, useCallback } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Box, Flex, Text } from 'rebass'
import TokenLogo from '../TokenLogo'
import { CustomLink } from '../Link'
import Row from '../Row'
import { Divider } from '..'
import LocalLoader from '../LocalLoader'
import { formattedNum, formattedPercent } from '../../utils'
import { useMedia } from 'react-use'
import { OVERVIEW_TOKEN_BLACKLIST } from '../../constants'
import FormattedName from '../FormattedName'
import { PagePicker } from '../Page'
import { ArrowDownIcon } from '../../svg/'
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

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

const SORT_FIELD = {
  LIQ: 'totalLiquidityUSD',
  VOL: 'oneDayVolumeUSD',
  SYMBOL: 'symbol',
  NAME: 'name',
  PRICE: 'priceUSD',
  CHANGE: 'priceChangeUSD',
}

// @TODO rework into virtualized list
function TopTokenList({ tokens, itemMax = 10 }) {
  // page state
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  // sorting
  const [sortDirection, setSortDirection] = useState(true)
  const [sortedColumn, setSortedColumn] = useState(SORT_FIELD.LIQ)

  const below1080 = useMedia('(max-width: 1080px)')
  const below680 = useMedia('(max-width: 680px)')
  const below600 = useMedia('(max-width: 600px)')

  const t = useTranslation()

  useEffect(() => {
    setMaxPage(1) // edit this to do modular
    setPage(1)
  }, [tokens])

  const formattedTokens = useMemo(() => {
    return (
      tokens &&
      Object.keys(tokens)
        .filter((key) => {
          return !OVERVIEW_TOKEN_BLACKLIST.includes(key)
        })
        .map((key) => tokens[key])
    )
  }, [tokens])

  useEffect(() => {
    if (tokens && formattedTokens) {
      let extraPages = 1
      if (formattedTokens.length % itemMax === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(formattedTokens.length / itemMax) + extraPages)
    }
  }, [tokens, formattedTokens, itemMax])

  const filteredList = useMemo(() => {
    return (
      formattedTokens &&
      formattedTokens
        .sort((a, b) => {
          if (sortedColumn === SORT_FIELD.SYMBOL || sortedColumn === SORT_FIELD.NAME) {
            return a[sortedColumn] > b[sortedColumn] ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1
          }
          return parseFloat(a[sortedColumn]) > parseFloat(b[sortedColumn])
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1
        })
        .slice(itemMax * (page - 1), page * itemMax)
    )
  }, [formattedTokens, itemMax, page, sortDirection, sortedColumn])

  const ListItem = useCallback(
    ({ item, index }) => {
      return (
        <DashGrid
          style={{ height: '56px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '0 16px' }}
          focus={true}
        >
          <DataText area="name" fontWeight="500">
            <Row>
              {!below680 && <div style={{ marginRight: '1rem', width: '10px' }}>{index}</div>}
              <TokenLogo address={item.id} />
              <CustomLink
                style={{ marginLeft: '16px', whiteSpace: 'nowrap' }}
                to={'/token/' + item.id + window.location.search}
              >
                <FormattedName
                  text={below680 ? item.symbol : item.name}
                  maxCharacters={below600 ? 8 : 16}
                  adjustSize={true}
                  link={true}
                />
              </CustomLink>
            </Row>
          </DataText>
          {!below680 && (
            <DataText area="symbol" color="text" fontWeight="400">
              <FormattedName text={item.symbol.toUpperCase()} maxCharacters={5} />
            </DataText>
          )}
          <DataText area="liq">{formattedNum(item.totalLiquidityUSD, true)}</DataText>
          <DataText area="vol">{formattedNum(item.oneDayVolumeUSD, true)}</DataText>
          {!below1080 && (
            <DataText area="price" color="text" fontWeight="400">
              {formattedNum(item.priceUSD, true)}
            </DataText>
          )}
          {!below1080 && (
            <DataText area="change" style={{ justifyContent: 'flex-end' }}>
              {formattedPercent(item.priceChangeUSD)}
            </DataText>
          )}
        </DashGrid>
      )
    },
    [below1080, below600, below680]
  )

  return (
    <ListWrapper>
      <DashGrid center={true} style={{ height: 'fit-content' }} isHeader>
        <Flex alignItems="center" justifyContent="left">
          <ClickableText
            area="name"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.NAME)
              setSortDirection(sortedColumn !== SORT_FIELD.NAME ? true : !sortDirection)
            }}
          >
            {below680 ? t('symbol') : t('name')}{' '}
            {sortedColumn === SORT_FIELD.NAME ? (
              !sortDirection ? (
                <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <ArrowDownIcon width="14px" height="14px" />
              )
            ) : (
              ''
            )}
          </ClickableText>
        </Flex>
        {!below680 && (
          <Flex alignItems="center" justifyContent="left">
            <ClickableText
              area="symbol"
              onClick={(e) => {
                setSortedColumn(SORT_FIELD.SYMBOL)
                setSortDirection(sortedColumn !== SORT_FIELD.SYMBOL ? true : !sortDirection)
              }}
            >
              {t('symbol')}{' '}
              {sortedColumn === SORT_FIELD.SYMBOL ? (
                !sortDirection ? (
                  <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
                ) : (
                  <ArrowDownIcon width="14px" height="14px" />
                )
              ) : (
                ''
              )}
            </ClickableText>
          </Flex>
        )}

        <Flex alignItems="center" justifyContent="left">
          <ClickableText
            area="liq"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.LIQ)
              setSortDirection(sortedColumn !== SORT_FIELD.LIQ ? true : !sortDirection)
            }}
          >
            {t('liquidity')}{' '}
            {sortedColumn === SORT_FIELD.LIQ ? (
              !sortDirection ? (
                <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <ArrowDownIcon width="14px" height="14px" />
              )
            ) : (
              ''
            )}
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
            {t('volume24hrs')}
            {sortedColumn === SORT_FIELD.VOL ? (
              !sortDirection ? (
                <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <ArrowDownIcon width="14px" height="14px" />
              )
            ) : (
              ''
            )}
          </ClickableText>
        </Flex>
        {!below1080 && (
          <Flex alignItems="center" justifyContent="left">
            <ClickableText
              area="price"
              onClick={(e) => {
                setSortedColumn(SORT_FIELD.PRICE)
                setSortDirection(sortedColumn !== SORT_FIELD.PRICE ? true : !sortDirection)
              }}
            >
              {t('price')}{' '}
              {sortedColumn === SORT_FIELD.PRICE ? (
                !sortDirection ? (
                  <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
                ) : (
                  <ArrowDownIcon width="14px" height="14px" />
                )
              ) : (
                ''
              )}
            </ClickableText>
          </Flex>
        )}
        {!below1080 && (
          <Flex alignItems="center" justifyContent="flex-end">
            <ClickableText
              area="change"
              onClick={(e) => {
                setSortedColumn(SORT_FIELD.CHANGE)
                setSortDirection(sortedColumn !== SORT_FIELD.CHANGE ? true : !sortDirection)
              }}
            >
              {t('priceChange24hrs')}
              {sortedColumn === SORT_FIELD.CHANGE ? (
                !sortDirection ? (
                  <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
                ) : (
                  <ArrowDownIcon width="14px" height="14px" />
                )
              ) : (
                ''
              )}
            </ClickableText>
          </Flex>
        )}
      </DashGrid>
      <Divider />
      <List p={0}>
        {!filteredList || filteredList.length === 0 ? (
          <LocalLoader />
        ) : (
          filteredList.map((item, index) => {
            return (
              <div key={index}>
                <ListItem key={index} index={(page - 1) * itemMax + index + 1} item={item} />
                <Divider />
              </div>
            )
          })
        )}
      </List>
      <PagePicker
        onBackClick={() => setPage(page === 1 ? page : page - 1)}
        onNextClick={() => setPage(page === maxPage ? page : page + 1)}
        page={page}
        maxPage={maxPage}
      />
    </ListWrapper>
  )
}

export default memo(TopTokenList)
