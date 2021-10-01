import React, { lazy, Suspense, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { getCurrentNetworkName, isAddress } from './utils'
// import AccountPage from './pages/AccountPage'
// import PinnedData from './components/PinnedData'
import SideNav from './components/SideNav'
// import AccountLookup from './pages/AccountLookup'
import { OVERVIEW_TOKEN_BLACKLIST, PAIR_BLACKLIST } from './constants'
import LocalLoader from './components/LocalLoader'
import { useLatestBlocks } from './contexts/Application'
import { BurgerIcon, CloseIcon, GravisIcon, SearchIcon } from './svg'
import { SavedInfo } from './components/SavedInfo'
import { useMedia } from 'react-use'
// import AccountLookup from './pages/AccountLookup'
import { setDefaultLanguage, setLanguage, setTranslations, useTranslation } from 'react-multi-lang'
import en from './locales/en.json'
import jp from './locales/jp.json'
import cn from './locales/cn.json'
import { setTranslationHook } from './utils/data'

const GlobalPage = lazy(() => import('./pages/GlobalPage'))
const TokenPage = lazy(() => import('./pages/TokenPage'))
const PairPage = lazy(() => import('./pages/PairPage'))
const AllTokensPage = lazy(() => import('./pages/AllTokensPage'))
const AllPairsPage = lazy(() => import('./pages/AllPairsPage'))

const AppWrapper = styled.div`
  position: relative;
  width: 100%;

  @media screen and (max-width: 1024px) {
    overflow-x: hidden;
  }
`
const ContentWrapper = styled.div`
  display: flex;
  background: #1c1c1c;
  // grid-template-columns: ${({ open }) => (open ? '220px 1fr 200px' : '220px 1fr 64px')};
  //
  // @media screen and (max-width: 1400px) {
  //   grid-template-columns: 220px 1fr;
  // }
  //
  // @media screen and (max-width: 1080px) {
  //   grid-template-columns: 1fr;
  //   max-width: 100vw;
  //   overflow: hidden;
  //   grid-gap: 0;
  // }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    overflow-x: hidden;
  }
`

// const Right = styled.div`
//   position: fixed;
//   right: 0;
//   bottom: 0rem;
//   z-index: 99;
//   width: ${({ open }) => (open ? '220px' : '64px')};
//   height: ${({ open }) => (open ? 'fit-content' : '64px')};
//   overflow: auto;
//   background-color: ${({ theme }) => theme.bg1};
//   @media screen and (max-width: 1400px) {
//     display: none;
//   }
// `

const Center = styled.div`
  flex-basis: ${({ isPushed }) => (isPushed ? '100%' : '82%')};
  height: 100%;
  z-index: 2;
  transition: width 0.25s ease;
  background-color: ${({ theme }) => theme.onlyLight};

  @media screen and (max-width: 1024px) {
    flex-basis: 100%;
  }
`

const WarningWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const WarningBanner = styled.div`
  background-color: #ff6871;
  padding: 1.5rem;
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 500;
`

const StyledHeaderContainer = styled.div`
  height: 73px;
  // background: white;
  display: none;
  padding: 12px 24px 0 24px;
  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const StyledRightContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledBurgerIcon = styled(BurgerIcon)`
  background: linear-gradient(90.28deg, #292929 0%, #242424 100%);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  border-radius: 34px;
  padding: 12px;
  cursor: pointer;
  margin-right: 25px;
`

const StyledCloseIcon = styled(CloseIcon)`
  background: linear-gradient(90.28deg, #292929 0%, #242424 100%);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  border-radius: 34px;
  padding: 12px;
  cursor: pointer;
  margin-right: 25px;
`

const StyledSearchIcon = styled(SearchIcon)`
  background: linear-gradient(90.28deg, #292929 0%, #242424 100%);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  border-radius: 34px;
  padding: 12px;
  cursor: pointer;
  margin-right: 25px;
  width: 24px;

  > * {
    stroke: #929292;
  }
`
setTranslations({ en, jp, cn })
const localStorageLanguageItem = 'gravisApplicationsLanguage'
const urlSearchLanguageParam = 'gravisLanguage'

const getDefaultLanguage = () => {
  if (localStorage.getItem(localStorageLanguageItem))
    return localStorage.getItem(localStorageLanguageItem)?.toLowerCase()
  if (navigator.language) {
    if (navigator.language.includes('en')) {
      localStorage.setItem(localStorageLanguageItem, 'EN')
      return 'en'
    }
    if (navigator.language.includes('jp') || navigator.language.includes('jpn')) {
      localStorage.setItem(localStorageLanguageItem, 'JP')
      return 'jp'
    }
  } else {
    localStorage.setItem(localStorageLanguageItem, 'EN')
    return 'en'
  }
}

const getLanguageSearchParam = () => {
  const { search } = window.location
  if (search.includes(urlSearchLanguageParam)) {
    const language = search.slice(search.indexOf(urlSearchLanguageParam) + urlSearchLanguageParam.length + 1)
    if (language.toLowerCase() === 'jp' || language.toLowerCase() === 'en') {
      localStorage.setItem(localStorageLanguageItem, language.toUpperCase())
      return language.toLowerCase()
    }
    return getDefaultLanguage()
  }
  return getDefaultLanguage()
}

setDefaultLanguage(getLanguageSearchParam())

const LayoutWrapper = ({ children, savedOpen }) => {
  const isMobile = useMedia('(max-width: 1024px)')
  const [isPushed, setIsPushed] = useState(isMobile)
  setTranslationHook(useTranslation())

  return (
    <>
      <ContentWrapper open={savedOpen}>
        <SideNav setIsPushedState={setIsPushed} isPushed={isPushed} />
        <StyledHeaderContainer>
          <GravisIcon />
          <StyledRightContainer>
            <StyledSearchIcon />
            {isPushed ? (
              <StyledBurgerIcon onClick={() => setIsPushed(false)} />
            ) : (
              <StyledCloseIcon onClick={() => setIsPushed(true)} />
            )}
            <SavedInfo />
          </StyledRightContainer>
        </StyledHeaderContainer>
        <Center id="center" isPushed={isPushed}>
          {children}
        </Center>
        {/* <Right open={savedOpen}>
          <PinnedData open={savedOpen} setSavedOpen={setSavedOpen} />
        </Right> */}
      </ContentWrapper>
    </>
  )
}

const BLOCK_DIFFERENCE_THRESHOLD = 30

function App() {
  const [savedOpen, setSavedOpen] = useState(false)
  const [latestBlock, headBlock] = useLatestBlocks()

  // show warning
  const showWarning = headBlock && latestBlock ? headBlock - latestBlock > BLOCK_DIFFERENCE_THRESHOLD : false

  useEffect(() => {
    if (!window.location.search) window.location.search = 'network=polygon'
    if (localStorage.getItem('gravisApplicationsLanguage'))
      setLanguage(localStorage.getItem('gravisApplicationsLanguage')?.toLocaleLowerCase())
    else setLanguage('en')
  }, [])

  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        {showWarning && (
          <WarningWrapper>
            <WarningBanner>
              {`Warning: The data on this site has only synced to ${getCurrentNetworkName() === 'polygon' ? 'Polygon Chain' : 'Binance Smart Chain'} block ${latestBlock} (out of ${headBlock}). Please check back soon.`}
            </WarningBanner>
          </WarningWrapper>
        )}

        <BrowserRouter>
          <Suspense fallback={<LocalLoader fill height="100vh" />}>
            <Switch>
              <Route
                exacts
                strict
                path="/token/:tokenAddress"
                render={({ match }) => {
                  if (OVERVIEW_TOKEN_BLACKLIST.includes(match.params.tokenAddress.toLowerCase())) {
                    return <Redirect to="/home" />
                  }
                  if (isAddress(match.params.tokenAddress.toLowerCase())) {
                    return (
                      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                        <TokenPage address={match.params.tokenAddress.toLowerCase()} />
                      </LayoutWrapper>
                    )
                  } else {
                    return <Redirect to="/home" />
                  }
                }}
              />
              <Route
                exacts
                strict
                path="/pair/:pairAddress"
                render={({ match }) => {
                  if (PAIR_BLACKLIST.includes(match.params.pairAddress.toLowerCase())) {
                    return <Redirect to="/home" />
                  }
                  if (isAddress(match.params.pairAddress.toLowerCase())) {
                    return (
                      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                        <PairPage pairAddress={match.params.pairAddress.toLowerCase()} />
                      </LayoutWrapper>
                    )
                  } else {
                    return <Redirect to="/home" />
                  }
                }}
              />
              {/* <Route
                exacts
                strict
                path="/account/:accountAddress"
                render={({ match }) => {
                  if (isAddress(match.params.accountAddress.toLowerCase())) {
                    return (
                      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                        <AccountPage account={match.params.accountAddress.toLowerCase()} />
                      </LayoutWrapper>
                    )
                  } else {
                    return <Redirect to="/home" />
                  }
                }}
              /> */}

              <Route path="/home">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <GlobalPage />
                </LayoutWrapper>
              </Route>

              <Route path="/tokens">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <AllTokensPage />
                </LayoutWrapper>
              </Route>

              <Route path="/pairs">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <AllPairsPage />
                </LayoutWrapper>
              </Route>

              {/*<Route path="/accounts">*/}
              {/*  <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>*/}
              {/*    <AccountLookup />*/}
              {/*  </LayoutWrapper>*/}
              {/*</Route>*/}

              <Redirect to="/home" />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppWrapper>
    </ApolloProvider>
  )
}

export default App
