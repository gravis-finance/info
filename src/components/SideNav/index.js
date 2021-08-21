import React, { memo } from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { transparentize } from 'polished'
// import { TYPE } from '../../Theme'
import { useHistory, withRouter } from 'react-router-dom'
import Link from '../Link'
// import { useSessionStart } from '../../contexts/Application'
import { HomeIcon, PairsIcon, SidebarCloseIcon, TokensIcon, TrendingIcon } from '../../svg'
import { LinksContainer } from '../LinksContainer'
import { useTranslation } from 'react-multi-lang'
import { getCurrentNetworkName, getNetworkForAnalytics } from '../../utils'
// import { useDarkModeManager } from '../../contexts/LocalStorage'
// import Toggle from '../Toggle'

const Wrapper = styled.div`
  height: ${({ isMobile }) => (isMobile ? 'initial' : '100vh')};
  position: relative;
  // background-color: ${({ theme }) => transparentize(0.4, theme.bg1)};
  color: ${({ theme }) => theme.text1};
  padding: 28px 16px;
  position: sticky;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;
  background: #262626;
  // color: ${({ theme }) => theme.bg2};
  transition: width 200ms ease-in-out;
  width: ${({ isPushed }) => (isPushed ? '88px' : '256px')};
  overflow: hidden;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }

  @media screen and (max-width: 1024px) {
    position: absolute;
    transition: right 200ms ease-in-out;
    width: 315px;
    right: 0;
    ${({ isPushed }) => (isPushed ? 'right: -100%;' : '')}
    top: 95px;
  }
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0px;
  opacity: 1;
  color: #909090;
  display: flex;
  transition: color 200ms ease-in-out;
  height: 44px;

  background: linear-gradient(90.28deg, #292929 0%, #242424 100%), #303030;
  border: 1px solid #2e2e2e;
  box-sizing: border-box;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  border-radius: 52px;

  ${({ activeText }) =>
    activeText
      ? `
      color: white;box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
      border-radius: 52px;
      background: linear-gradient(90.28deg, #242424 0%, #1F1F1F 100%), #212121;
      box-shadow: inset 0px -1px 0px rgba(129, 129, 129, 0.15), inset 0px 4px 25px rgba(0, 0, 0, 0.25);`
      : ''}

  svg * {
    ${({ activeText }) => (activeText ? 'stroke: white' : '')}
    transition: stroke 200ms ease-in-out;
  }

  :hover {
    color: white;
    background: linear-gradient(90.28deg, #242424 0%, #202020 100%), linear-gradient(90.28deg, #292929 0%, #242424 100%),
      #303030;
    svg * {
      stroke: white;
    }
  }

  @media screen and (max-width: 1024px) {
    background: none;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #313131;
    border-radius: 0;
    :hover {
      background: none;
    }
  }
`

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: relative;

  @media screen and (max-width: 1024px) {
    height: calc(100vh - 95px);
  }
`

// const HeaderText = styled.div`
//   margin-right: 0.75rem;
//   font-size: 0.825rem;
//   font-weight: 500;
//   display: inline-box;
//   display: -webkit-inline-box;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
//   a {
//     color: ${({ theme }) => theme.white};
//   }
// `

// const Polling = styled.div`
//   position: fixed;
//   display: flex;
//   left: 0;
//   bottom: 0;
//   padding: 1rem;
//   color: white;
//   opacity: 0.4;
//   transition: opacity 0.25s ease;
//   :hover {
//     opacity: 1;
//   }
// `
// const PollingDot = styled.div`
//   width: 8px;
//   height: 8px;
//   min-height: 8px;
//   min-width: 8px;
//   margin-right: 0.5rem;
//   margin-top: 3px;
//   border-radius: 50%;
//   background-color: ${({ theme }) => theme.green1};
// `

const TogglePushButton = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  position: absolute;
  right: -14px;
  top: 40.5%;
  cursor: pointer;
  transition: background 200ms ease-in-out;

  > svg {
    margin: auto;
  }

  > svg *:last-child {
    ${({ isPushed }) => (isPushed ? `transform: rotate(180deg) translate(-44px, -135px)` : '')};
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`

const StyledAutoColumn = styled(AutoColumn)`
  ${({ isPushed }) => (isPushed ? 'margin-top: 45px; width: 55px;' : 'margin-top: 45px;')}

  @media screen and (max-width: 1024px) {
    margin-top: 0;
  }
`

function SideNav({ setIsPushedState, isPushed }) {
  const below1080 = useMedia('(max-width: 1080px)')
  const history = useHistory()
  // const [isDark, toggleDarkMode] = useDarkModeManager()

  const onClickHandler = () => {
    setIsPushedState(!isPushed)
  }

  const t = useTranslation()

  return (
    <Wrapper isMobile={below1080} isPushed={isPushed}>
      <DesktopWrapper>
        <TogglePushButton isPushed={isPushed}>
          <SidebarCloseIcon onClick={onClickHandler} />
        </TogglePushButton>
        <AutoColumn gap="1rem">
          <Title isPushed={isPushed} />
          <StyledAutoColumn gap="8px" isPushed={isPushed}>
            <BasicLink to={`/home${window.location.search}`} isPushed={isPushed}>
              <Option activeText={history.location.pathname === '/home' ?? undefined}>
                {/*<TrendingUp size={20} style={{ marginRight: '.75rem' }} />*/}
                <TrendingIcon style={{ marginRight: '16px' }} width="24px" />
                {!isPushed ? t('mainMenu.analytics.overview') : ''}
              </Option>
            </BasicLink>
            <BasicLink to={`/tokens${window.location.search}`} isPushed={isPushed}>
              <Option
                activeText={
                  (history.location.pathname.split('/')[1] === 'tokens' ||
                    history.location.pathname.split('/')[1] === 'token') ??
                  undefined
                }
              >
                <TokensIcon style={{ marginRight: '16px' }} width="24px" />
                {!isPushed ? t('mainMenu.analytics.tokens') : ''}
              </Option>
            </BasicLink>
            <BasicLink to={`/pairs${window.location.search}`} isPushed={isPushed}>
              <Option
                activeText={
                  (history.location.pathname.split('/')[1] === 'pairs' ||
                    history.location.pathname.split('/')[1] === 'pair') ??
                  undefined
                }
              >
                <PairsIcon style={{ marginRight: '16px' }} width="24px" />
                {!isPushed ? t('mainMenu.analytics.pairs') : ''}
              </Option>
            </BasicLink>
            <Link
              external
              href={`${process.env.REACT_APP_GRAVIS_SWAP_URL}/swap?network=${getNetworkForAnalytics(getCurrentNetworkName())}&gravisLanguage=${t('language')}`}
              isPushed={isPushed}
            >
              <Option
                activeText={
                  (history.location.pathname.split('/')[1] === '' || history.location.pathname.split('/')[1] === '') ??
                  undefined
                }
              >
                <HomeIcon style={{ marginRight: '16px' }} width="24px" />
                {!isPushed ? t('mainMenu.analytics.gswap') : ''}
              </Option>
            </Link>
          </StyledAutoColumn>
          <LinksContainer />
        </AutoColumn>
      </DesktopWrapper>
    </Wrapper>
  )
}

export default withRouter(memo(SideNav))
