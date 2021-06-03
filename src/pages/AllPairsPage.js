import React, { useEffect, lazy, Suspense } from 'react'

import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import { useAllPairData } from '../contexts/PairData'
import PairList from '../components/PairList'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { SavedInfo } from '../components/SavedInfo'
import { useTranslation } from 'react-multi-lang'
import LanguageSwitch from '../components/LanguageSwitcher'

const NetworkSwitcher = lazy(() => import('../components/NetworkSwitcher'))
// eslint-disable-next-line no-unused-expressions
import('feather-icons')

const StyledPageWrapper = styled(PageWrapper)`
  padding-top: 38px;
`

function AllPairsPage() {
  const allPairs = useAllPairData()
  const t = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below800 = useMedia('(max-width: 800px)')

  return (
    <StyledPageWrapper>
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>{t('topPairs')}</TYPE.largeHeader>
          {!below800 && (
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
          <PairList pairs={allPairs} disbaleLinks={true} maxItems={50} />
        </Panel>
      </FullWrapper>
    </StyledPageWrapper>
  )
}

export default AllPairsPage
