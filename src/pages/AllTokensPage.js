import React, { useEffect, lazy, Suspense } from 'react'

import TopTokenList from '../components/TokenList'
import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { SavedInfo } from '../components/SavedInfo'
import { Flex } from 'rebass'
import { useTranslation } from 'react-multi-lang'
import LanguageSwitch from '../components/LanguageSwitcher'

const NetworkSwitcher = lazy(() => import('../components/NetworkSwitcher'))

// eslint-disable-next-line no-unused-expressions
import('feather-icons')

const StyledPageWrapper = styled(PageWrapper)`
  padding-top: 38px;
`

function AllTokensPage() {
  const allTokens = useAllTokenData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  const t = useTranslation()

  return (
    <StyledPageWrapper>
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>{t('topTokens')}</TYPE.largeHeader>
          {!below600 && (
            <Flex alignItems="center">
              <LanguageSwitch local />
              <Search small={true} big disableMargin />
              <Suspense fallback={null}>
                <NetworkSwitcher local />{' '}
              </Suspense>
              <SavedInfo ml={32} style={{ flexBasis: '8%' }} />
            </Flex>
          )}
        </RowBetween>
        <Panel style={{ marginTop: '16px', padding: '0' }}>
          <TopTokenList tokens={allTokens} itemMax={50} />
        </Panel>
      </FullWrapper>
    </StyledPageWrapper>
  )
}

export default AllTokensPage
