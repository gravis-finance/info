import React, { useState, useEffect, memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { formatTime, formattedNum, urls } from '../../utils'
import { useMedia } from 'react-use'
import { useCurrentCurrency } from '../../contexts/Application'
import { RowFixed, RowBetween } from '../Row'

import LocalLoader from '../LocalLoader'
import { Box, Flex, Text } from 'rebass'
import Link from '../Link'
import { Divider, EmptyCard } from '..'
import DropdownSelect from '../DropdownSelect'
import FormattedName from '../FormattedName'
import { TYPE } from '../../Theme'
import { getCurrentNetworkLinks, updateNameData } from '../../utils/data'
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
      width: 100%;
    }
  }

  @media screen and (min-width: 680px) {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1.75fr 1fr 1fr 1fr 0.6fr 1fr;
    grid-template-areas: 'name symbol liq vol ';

    > * {
      justify-content: flex-end;
      width: 100%;

      &:first-child {
        justify-content: flex-start;
      }
    }
  }

  display: grid;
  grid-gap: 0.5em;
  grid-template-rows: 14px;
  grid-template-columns: 1.75fr 1fr 1fr 1fr 0.6fr 1fr;
  grid-template-areas: 'name symbol liq vol price change';
  place-content: center;
`

const ClickableText = styled(Text)`
  text-align: end;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  user-select: none;
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  align-items: center;
  display: flex;

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
  }

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

const SortText = styled.button`
  cursor: pointer;
  font-weight: ${({ active, theme }) => (active ? 500 : 400)};
  margin-right: 0.75rem !important;
  border: none;
  background-color: transparent;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 0px;
  color: ${({ active, theme }) => (active ? theme.text1 : 'rgba(255, 255, 255, 0.5)')};
  outline: none;
  font-weight: 700;

  ${({ active }) =>
    active
      ? `background: #009CE1;
  border-radius: 21px;
  padding: 8px 10px;
  color: white;
  `
      : ''}

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`

const SORT_FIELD = {
  VALUE: 'amountUSD',
  AMOUNT0: 'token0Amount',
  AMOUNT1: 'token1Amount',
  TIMESTAMP: 'timestamp',
}

const TXN_TYPE = {
  ALL: 'All',
  SWAP: 'Swaps',
  ADD: 'Adds',
  REMOVE: 'Removes',
}

const ITEMS_PER_PAGE = 10

function getTransactionType(event, symbol0, symbol1, t) {
  const formattedS0 = symbol0?.length > 8 ? symbol0.slice(0, 7) + '...' : symbol0
  const formattedS1 = symbol1?.length > 8 ? symbol1.slice(0, 7) + '...' : symbol1
  switch (event) {
    case TXN_TYPE.ADD:
      return t('addAnd', { inputAmount: formattedS0, outputAmount: formattedS1})
    case TXN_TYPE.REMOVE:
      return t('removeTransaction', { transactionA: formattedS0, transactionB: formattedS1})
    case TXN_TYPE.SWAP:
      return t('swapFor', { inputAmount: formattedS0, outputAmount: formattedS1})
    default:
      return ''
  }
}

// @TODO rework into virtualized list
function TxnList({ transactions, symbol0Override, symbol1Override, color }) {
  // page state
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  // sorting
  const [sortDirection, setSortDirection] = useState(true)
  const [sortedColumn, setSortedColumn] = useState(SORT_FIELD.TIMESTAMP)
  const [filteredItems, setFilteredItems] = useState()
  const [txFilter, setTxFilter] = useState(TXN_TYPE.ALL)

  const [currency] = useCurrentCurrency()

  const t = useTranslation()

  useEffect(() => {
    setMaxPage(1) // edit this to do modular
    setPage(1)
  }, [transactions])

  // parse the txns and format for UI
  useEffect(() => {
    if (transactions && transactions.mints && transactions.burns && transactions.swaps) {
      let newTxns = []
      if (transactions.mints.length > 0) {
        transactions.mints.map((mint) => {
          let newTxn = {}
          newTxn.hash = mint.transaction.id
          newTxn.timestamp = mint.transaction.timestamp
          newTxn.type = TXN_TYPE.ADD
          newTxn.token0Amount = mint.amount0
          newTxn.token1Amount = mint.amount1
          newTxn.account = mint.to
          newTxn.token0Symbol = updateNameData(mint.pair).token0.symbol
          newTxn.token1Symbol = updateNameData(mint.pair).token1.symbol
          newTxn.amountUSD = mint.amountUSD
          return newTxns.push(newTxn)
        })
      }
      if (transactions.burns.length > 0) {
        transactions.burns.map((burn) => {
          let newTxn = {}
          newTxn.hash = burn.transaction.id
          newTxn.timestamp = burn.transaction.timestamp
          newTxn.type = TXN_TYPE.REMOVE
          newTxn.token0Amount = burn.amount0 ? burn.amount0 : '-'
          newTxn.token1Amount = burn.amount1 ? burn.amount1 : '-'
          newTxn.account = burn.sender
          newTxn.token0Symbol = updateNameData(burn.pair).token0.symbol
          newTxn.token1Symbol = updateNameData(burn.pair).token1.symbol
          newTxn.amountUSD = burn.amountUSD ? burn.amountUSD : '-'
          return newTxns.push(newTxn)
        })
      }
      if (transactions.swaps.length > 0) {
        transactions.swaps.map((swap) => {
          const netToken0 = swap.amount0In - swap.amount0Out
          const netToken1 = swap.amount1In - swap.amount1Out

          let newTxn = {}

          if (netToken0 < 0) {
            newTxn.token0Symbol = updateNameData(swap.pair).token0.symbol
            newTxn.token1Symbol = updateNameData(swap.pair).token1.symbol
            newTxn.token0Amount = Math.abs(netToken0)
            newTxn.token1Amount = Math.abs(netToken1)
          } else if (netToken1 < 0) {
            newTxn.token0Symbol = updateNameData(swap.pair).token1.symbol
            newTxn.token1Symbol = updateNameData(swap.pair).token0.symbol
            newTxn.token0Amount = Math.abs(netToken1)
            newTxn.token1Amount = Math.abs(netToken0)
          }

          newTxn.hash = swap.transaction.id
          newTxn.timestamp = swap.transaction.timestamp
          newTxn.type = TXN_TYPE.SWAP

          newTxn.amountUSD = swap.amountUSD
          newTxn.account = swap.to
          return newTxns.push(newTxn)
        })
      }

      const filtered = newTxns.filter((item) => {
        if (txFilter !== TXN_TYPE.ALL) {
          return item.type === txFilter
        }
        return true
      })
      setFilteredItems(filtered)
      let extraPages = 1
      if (filtered.length % ITEMS_PER_PAGE === 0) {
        extraPages = 0
      }
      if (filtered.length === 0) {
        setMaxPage(1)
      } else {
        setMaxPage(Math.floor(filtered.length / ITEMS_PER_PAGE) + extraPages)
      }
    }
  }, [transactions, txFilter])

  useEffect(() => {
    setPage(1)
  }, [txFilter])

  const filteredList = useMemo(
    () =>
      filteredItems &&
      filteredItems
        .sort((a, b) => {
          return parseFloat(a[sortedColumn]) > parseFloat(b[sortedColumn])
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1
        })
        .slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE),
    [filteredItems, page, sortDirection, sortedColumn]
  )

  const below1080 = useMedia('(max-width: 1080px)')
  const below780 = useMedia('(max-width: 780px)')

  const ListItem = useCallback(
    ({ item }) => {
      return (
        <DashGrid style={{ height: '56px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '0 16px' }}>
          <DataText area="txn" fontWeight="500">
            <Link color={'#009CE1'} external href={urls.showTransaction(item.hash)}>
              {getTransactionType(item.type, item.token1Symbol, item.token0Symbol, t)}
            </Link>
          </DataText>
          <DataText area="value">
            {currency === 'ETH' ? 'Ξ ' + formattedNum(item.valueETH) : formattedNum(item.amountUSD, true)}
          </DataText>
          {!below780 && (
            <>
              <DataText area="amountOther">
                {formattedNum(item.token1Amount) + ' '}{' '}
                <FormattedName text={item.token1Symbol} maxCharacters={5} margin={true} />
              </DataText>
              <DataText area="amountToken">
                {formattedNum(item.token0Amount) + ' '}{' '}
                <FormattedName text={item.token0Symbol} maxCharacters={5} margin={true} />
              </DataText>
            </>
          )}
          {!below1080 && (
            <DataText area="account">
              <Link color={'#009CE1'} external href={getCurrentNetworkLinks().SCAN_LINK + item.account}>
                {item.account && item.account.slice(0, 6) + '...' + item.account.slice(38, 42)}
              </Link>
            </DataText>
          )}
          <DataText area="time" style={{ justifyContent: 'flex-end' }}>
            {formatTime(item.timestamp, t)}
          </DataText>
        </DashGrid>
      )
    },
    [t, below1080, below780, currency]
  )

  return (
    <>
      <DashGrid center={true} style={{ height: 'fit-content' }} isHeader>
        {below780 ? (
          <RowBetween area="txn">
            <DropdownSelect options={TXN_TYPE} active={txFilter} setActive={setTxFilter} color={color} />
          </RowBetween>
        ) : (
          <RowFixed area="txn" gap="10px" pl={4}>
            <SortText
              onClick={() => {
                setTxFilter(TXN_TYPE.ALL)
              }}
              active={txFilter === TXN_TYPE.ALL}
            >
              {t('all')}
            </SortText>
            <SortText
              onClick={() => {
                setTxFilter(TXN_TYPE.SWAP)
              }}
              active={txFilter === TXN_TYPE.SWAP}
            >
              {t('swaps')}
            </SortText>
            <SortText
              onClick={() => {
                setTxFilter(TXN_TYPE.ADD)
              }}
              active={txFilter === TXN_TYPE.ADD}
            >
              {t('adds')}
            </SortText>
            <SortText
              onClick={() => {
                setTxFilter(TXN_TYPE.REMOVE)
              }}
              active={txFilter === TXN_TYPE.REMOVE}
            >
              {t('removes')}
            </SortText>
          </RowFixed>
        )}

        <Flex alignItems="center" justifyContent="left">
          <ClickableText
            color="textDim"
            area="value"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.VALUE)
              setSortDirection(sortedColumn !== SORT_FIELD.VALUE ? true : !sortDirection)
            }}
          >
            {t('totalValue')} <SortDirection found={sortedColumn === SORT_FIELD.VALUE} sortDirection={sortDirection} />
          </ClickableText>
        </Flex>
        {!below780 && (
          <Flex alignItems="center" justifyContent="left">
            <ClickableText
              area="amountToken"
              color="textDim"
              onClick={() => {
                setSortedColumn(SORT_FIELD.AMOUNT0)
                setSortDirection(sortedColumn !== SORT_FIELD.AMOUNT0 ? true : !sortDirection)
              }}
            >
              {symbol0Override ? symbol0Override + ` ${t('amount')}` : `${t('tokenAmount')}`}{' '}
              <SortDirection found={sortedColumn === SORT_FIELD.AMOUNT0} sortDirection={sortDirection} />
            </ClickableText>
          </Flex>
        )}
        <>
          {!below780 && (
            <Flex alignItems="center" justifyContent="left">
              <ClickableText
                area="amountOther"
                color="textDim"
                onClick={() => {
                  setSortedColumn(SORT_FIELD.AMOUNT1)
                  setSortDirection(sortedColumn !== SORT_FIELD.AMOUNT1 ? true : !sortDirection)
                }}
              >
                {symbol1Override ? symbol1Override +  ` ${t('amount')}` : `${t('tokenAmount')}`}{' '}
                <SortDirection found={sortedColumn === SORT_FIELD.AMOUNT1} sortDirection={sortDirection} />
              </ClickableText>
            </Flex>
          )}
          {!below1080 && (
            <Flex alignItems="center" justifyContent="left">
              <TYPE.body
                area="account"
                style={{ color: '#FFFFFF', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700' }}
              >
                {t('account')}
              </TYPE.body>
            </Flex>
          )}
          <Flex alignItems="center" justifyContent="flex-end">
            <ClickableText
              area="time"
              color="textDim"
              onClick={() => {
                setSortedColumn(SORT_FIELD.TIMESTAMP)
                setSortDirection(sortedColumn !== SORT_FIELD.TIMESTAMP ? true : !sortDirection)
              }}
            >
              {t('time.time')} <SortDirection found={sortedColumn === SORT_FIELD.TIMESTAMP} sortDirection={sortDirection} />
            </ClickableText>
          </Flex>
        </>
      </DashGrid>
      <Divider />
      <List p={0}>
        {!filteredList ? (
          <LocalLoader />
        ) : filteredList.length === 0 ? (
          <EmptyCard>{t('noRecentTransactions')}</EmptyCard>
        ) : (
          filteredList.map((item, index) => {
            return (
              <div key={index}>
                <ListItem key={index} index={index + 1} item={item} />
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
    </>
  )
}

export default memo(TxnList)
