import styled from 'styled-components'
import ButtonBase from './ButtonBase'

const Option = styled(ButtonBase)<{ value?: number | string; selected?: boolean; label?: string }>`
  color: white;
  opacity: 0.5;
  background-color: inherit;
  font: inherit;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 8px;
  font-size: 14px;

  &:hover {
    opacity: 1;
  }

  ${({ selected }) =>
    selected &&
    `opacity: 1; 
    background: linear-gradient(90.28deg, #242424 0%, #1F1F1F 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF);
    border-radius: 5px
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25) inset, 0px -1px 0px 0px rgba(129, 129, 129, 0.15) inset;
`}
`

export default Option
