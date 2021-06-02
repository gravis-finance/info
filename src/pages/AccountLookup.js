import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { TYPE } from '../Theme'
import { PageWrapper, FullWrapper } from '../components'
import Panel from '../components/Panel'
import LPList from '../components/LPList'
import styled from 'styled-components'
import AccountSearch from '../components/AccountSearch'
import { useTopLps } from '../contexts/GlobalData'
import LocalLoader from '../components/LocalLoader'
import { RowBetween } from '../components/Row'
import { useMedia } from 'react-use'
import Search from '../components/Search'

// eslint-disable-next-line no-unused-expressions
import('feather-icons')

const AccountWrapper = styled.div`
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const StyledPageWrapper = styled(PageWrapper)`
  padding-top: 5px;
  // padding-top: 0;
`

const StyledFullWrapper = styled(FullWrapper)`
  padding: 0 29px;
  grid-gap: 0;
`

function AccountLookup() {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const topLps = useTopLps()

  const below600 = useMedia('(max-width: 600px)')

  return (
    <StyledPageWrapper>
      <StyledFullWrapper>
        <RowBetween>
          <TYPE.largeHeader>Wallet analytics</TYPE.largeHeader>
          {!below600 && <Search small={true} />}
        </RowBetween>
        <AccountWrapper>
          <AccountSearch />
        </AccountWrapper>
        <TYPE.main
          fontSize={'24px'}
          style={{ marginTop: '40px', color: '#FFFFFF', fontWeight: '500', marginBottom: '24px' }}
        >
          Top Liquidity Positions
        </TYPE.main>
        <Panel>{topLps && topLps.length > 0 ? <LPList lps={topLps} maxItems={200} /> : <LocalLoader />}</Panel>
      </StyledFullWrapper>
    </StyledPageWrapper>
  )
}

export default withRouter(AccountLookup)
