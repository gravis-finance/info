import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { RowFixed } from '../Row'
import { GravisIcon, GravisIconWithoutText } from '../../svg'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 10;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`

export default function Title({ isPushed }) {
  const history = useHistory()

  return (
    <TitleWrapper onClick={() => history.push('/' + window.location.search)}>
      <Flex alignItems="center" style={{ marginLeft: '10px' }}>
        <RowFixed>
          {/*<UniIcon id="link" onClick={() => history.push('/')}>*/}
          {/*  <img width={'150px'} src={Logo} alt="logo" />*/}
          {/*</UniIcon>*/}
          {!isPushed ? (
            <GravisIcon width="124px" height="40px" onClick={() => history.push('/' + window.location.search)} />
          ) : (
            <GravisIconWithoutText />
          )}
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}
