import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { ChevronIcon } from '../../svg'

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
`

const StyledChevronIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  background: linear-gradient(90.28deg, #292929 0%, #242424 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  border-radius: 47px;
  cursor: pointer;
  user-select: none;

  > svg {
    margin: auto;
    ${({ reversed }) => (reversed ? 'transform: rotate(180deg);' : '')}
  }
  :hover {
    ${({ faded }) =>
      !faded
        ? 'background: linear-gradient(90.28deg, #242424 0%, #202020 100%), #8677F0;box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);'
        : ''}
  }
  :active {
    ${({ faded }) =>
      !faded
        ? `background: linear-gradient(90.28deg, #242424 0%, #1F1F1F 100%), #6C5DD3;
    box-shadow: inset 0px -1px 0px rgba(129, 129, 129, 0.15), inset 0px 4px 25px rgba(0, 0, 0, 0.25);`
        : ''}
  }
  ${({ faded }) => (faded ? 'opacity: 0.4; cursor: default;' : '')}
`

const PagePicker = ({ onBackClick, onNextClick, page, maxPage }) => {
  return (
    <PageButtons>
      <div onClick={onBackClick}>
        {/*<Arrow faded={page === 1}>←</Arrow>*/}
        <StyledChevronIcon faded={page === 1}>
          <ChevronIcon width="24px" height="24px" />
        </StyledChevronIcon>
      </div>
      <Text color="rgba(255, 255, 255, 0.5)" fontSize={14} padding={'0 16px'}>
        {'Page ' + page + ' of ' + maxPage}
      </Text>
      <div onClick={onNextClick}>
        {/*<Arrow faded={page === maxPage}>→</Arrow>*/}
        <StyledChevronIcon reversed faded={page === maxPage}>
          <ChevronIcon width="24px" height="24px" />
        </StyledChevronIcon>
      </div>
    </PageButtons>
  )
}

export { PagePicker }
