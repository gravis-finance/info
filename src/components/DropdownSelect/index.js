import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  z-index: 20;
  position: relative;
  width: 142px;
  padding: 4px 10px;
  padding-right: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
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

const DropdownSelect = ({ options, active, setActive, color }) => {
  return (
    <Wrapper color={color}>
      <SortText active={active}>{active}</SortText>
      {Object.keys(options).map((key, index) => {
        let option = options[key]
        return (
          option !== active && (
            <SortText
              onClick={() => {
                setActive(option)
              }}
              key={index}
            >
              {option}
            </SortText>
          )
        )
      })}
    </Wrapper>
  )
}

export default DropdownSelect
