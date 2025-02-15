import React from 'react'
import styled from 'styled-components'
import {
  GitHubIcon,
  TelegramIcon,
  TwitterIcon,
  MediumIcon,
  DiscordIcon,
  CoinGeckoIcon,
  CoinMarketCapIcon
} from '../../svg'

const StyledContainer = styled.div`
  position: absolute;
  bottom: 41px;
  width: 100%;
`

const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  flex-flow: wrap;
`

const StyledLink = styled.a`
  cursor: pointer;
  svg * {
    fill: #919191;
    transition: fill 200ms ease-in-out;
  }
  :hover {
    svg * {
      fill: #009ce1;
    }
  }
  margin-bottom: 20px;
`

const getCurrentLanguage = () => {
  return localStorage.getItem('gravisApplicationsLanguage')?.toLowerCase()
}

const LinksContainer = () => {
  return (
    <StyledContainer>
      <StyledLinks>
        <StyledLink href="https://www.coingecko.com/en/coins/gravis-finance" target={'_blank'}>
          <CoinGeckoIcon width={16} height={16} />
        </StyledLink>
        <StyledLink href="https://coinmarketcap.com/currencies/gravis-finance/" target={'_blank'}>
          <CoinMarketCapIcon width={16} height={16} />
        </StyledLink>
        <StyledLink href="https://github.com/gravis-finance" target={'_blank'}>
          <GitHubIcon />
        </StyledLink>
        <StyledLink
          href={`${getCurrentLanguage() === 'jp' ? 'https://t.me/gravis_finance_jp' : 'https://t.me/Gravis_Finance_En'}`}
          target={'_blank'}
        >
          <TelegramIcon />
        </StyledLink>
        <StyledLink href="https://twitter.com/GravisFi" target={'_blank'}>
          <TwitterIcon />
        </StyledLink>
        <StyledLink href="https://medium.com/gravis-finance" target={'_blank'}>
          <MediumIcon />
        </StyledLink>
        <StyledLink href="https://discord.io/GravisFinance" target={'_blank'}>
          <DiscordIcon />
        </StyledLink>
      </StyledLinks>
    </StyledContainer>
  )
}

export { LinksContainer }
