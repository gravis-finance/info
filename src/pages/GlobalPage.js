import React, { useEffect, memo, lazy, Suspense } from 'react'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'

import { AutoRow, RowBetween } from '../components/Row'
import { AutoColumn } from '../components/Column'
import PairList from '../components/PairList'
import TopTokenList from '../components/TokenList'
import TxnList from '../components/TxnList'
import Search from '../components/Search'
import GlobalStats from '../components/GlobalStats'

import { useGlobalData, useGlobalTransactions } from '../contexts/GlobalData'
import { useAllPairData } from '../contexts/PairData'
import { useMedia } from 'react-use'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { formattedNum, formattedPercent } from '../utils'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import { ButtonLink } from '../components/Link'

import { PageWrapper, ContentWrapper } from '../components'
import { SavedInfo } from '../components/SavedInfo'
import { useTranslation } from 'react-multi-lang'
import LanguageSwitch from '../components/LanguageSwitcher'
import LocalLoader from '../components/LocalLoader'

const NetworkSwitcher = lazy(() => import('../components/NetworkSwitcher'))

const GlobalChart = lazy(() => import('../components/GlobalChart'))

const ListOptions = styled(AutoRow)`
  height: 40px;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 600;

  @media screen and (max-width: 640px) {
    font-size: 1rem;
  }
`

const GridRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  align-items: start;
  justify-content: space-between;
`

const StyledSavedInfo = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`

const StyledSearchContainer = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`

function GlobalPage() {
  // get data for lists and totals
  const allPairs = useAllPairData()
  const allTokens = useAllTokenData()
  const transactions = useGlobalTransactions()
  const { totalLiquidityUSD, oneDayVolumeUSD, volumeChangeUSD, liquidityChangeUSD } = useGlobalData()

  // breakpoints
  const below800 = useMedia('(max-width: 800px)')

  // scrolling refs

  useEffect(() => {
    document.querySelector('body').scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

  const t = useTranslation()

  return (
    <PageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.8, '#4FD8DE')} />
      <ContentWrapper>
        <div>
          <Flex justifyContent="space-between" alignItems="center">
            <TYPE.largeHeader>{t('analytics')}</TYPE.largeHeader>
            <Flex alignItems="center">
              <Suspense fallback={null}>
                <LanguageSwitch />
                <NetworkSwitcher />
              </Suspense>
              <StyledSavedInfo>
                <SavedInfo />
              </StyledSavedInfo>
            </Flex>
          </Flex>
          <StyledSearchContainer>
            <Search />
          </StyledSearchContainer>
          <GlobalStats />
          {below800 && ( // mobile card
            <Box mb={20}>
              <Panel>
                <Box>
                  <AutoColumn gap="36px">
                    <AutoColumn gap="20px">
                      <RowBetween>
                        <TYPE.main>{t('volume24hrs')}</TYPE.main>
                        <div />
                      </RowBetween>
                      <RowBetween align="flex-end">
                        <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={600}>
                          {formattedNum(oneDayVolumeUSD, true)}
                        </TYPE.main>
                        <TYPE.main fontSize={12}>{formattedPercent(volumeChangeUSD)}</TYPE.main>
                      </RowBetween>
                    </AutoColumn>
                    <AutoColumn gap="20px">
                      <RowBetween>
                        <TYPE.main>{t('totalLiquidity')}</TYPE.main>
                        <div />
                      </RowBetween>
                      <RowBetween align="flex-end">
                        <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={600}>
                          {formattedNum(totalLiquidityUSD, true)}
                        </TYPE.main>
                        <TYPE.main fontSize={12}>{formattedPercent(liquidityChangeUSD)}</TYPE.main>
                      </RowBetween>
                    </AutoColumn>
                  </AutoColumn>
                </Box>
              </Panel>
            </Box>
          )}
          {!below800 && (
            <GridRow>
              <Panel style={{ height: '100%', maxHeight: '342px', minHeight: '300px', overflow: 'hidden' }}>
                <Suspense fallback={<LocalLoader height="100%" />}>
                  <GlobalChart display="liquidity" />
                </Suspense>
              </Panel>
              <Panel style={{ height: '100%', maxHeight: '342px', overflow: 'hidden' }}>
                <Suspense fallback={<LocalLoader height="100%" />}>
                  <GlobalChart display="volume" />
                </Suspense>
              </Panel>
            </GridRow>
          )}
          {below800 && (
            <AutoColumn style={{ marginTop: '6px' }} gap="24px">
              <Panel style={{ height: '100%', minHeight: '300px' }}>
                <Suspense fallback={<LocalLoader height="100%" />}>
                  <GlobalChart display="liquidity" />
                </Suspense>
              </Panel>
            </AutoColumn>
          )}
          <ListOptions gap="10px" style={{ marginTop: '36px', marginBottom: '20px' }}>
            <RowBetween>
              <TYPE.main fontSize={'24px'} color="#FFFFFF">
                {t('topPairs')}
              </TYPE.main>
              <ButtonLink to={'/tokens' + window.location.search}>{t('seeAll')}</ButtonLink>
            </RowBetween>
          </ListOptions>
          <Panel style={{ padding: 0 }}>
            <TopTokenList tokens={allTokens} />
          </Panel>
          <ListOptions gap="10px" style={{ marginTop: '36px', marginBottom: '20px' }}>
            <RowBetween>
              <TYPE.main fontSize={'24px'} color="#FFFFFF">
                {t('topPairs')}
              </TYPE.main>
              <ButtonLink to={'/pairs' + window.location.search}>{t('seeAll')}</ButtonLink>
            </RowBetween>
          </ListOptions>
          <Panel style={{ padding: 0 }}>
            <PairList pairs={allPairs} />
          </Panel>

          <span>
            <TYPE.main fontSize={'24px'} color="#FFFFFF" style={{ marginTop: '2rem' }}>
              {t('transactions')}
            </TYPE.main>
          </span>
          <Panel style={{ margin: '23px 0', padding: 0 }}>
            <TxnList transactions={transactions} />
          </Panel>
        </div>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default memo(GlobalPage)
