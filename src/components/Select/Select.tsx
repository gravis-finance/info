import React from 'react'
import styled from 'styled-components'
import useControlled from './useControlled'
import Options from './Options'
import Option from './Option'

export type SelectProps = {
  className?: string
  invalid?: boolean
  fullWidth?: boolean
  IconComponent?: React.ElementType
  format?: any
  disabled?: boolean
  native?: boolean
  InputComponent?: React.ElementType
  inputProps?: any
  inputRef?: any
  editable?: boolean
  onToggle?: (state: boolean) => void
  container?: any
  disablePortal?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

const StyledRoot = styled.div<{ $fullWidth?: boolean; $open: boolean }>`
  display: inline-flex;
  position: relative;
  height: fit-content;
  background: linear-gradient(90.28deg, #292929 0%, #242424 100%);
  border: 1px solid #2e2e2e;
  box-sizing: border-box;
  box-shadow: 4px 4px 12px rgb(0 0 0 / 40%), -4px -4px 12px rgb(255 255 255 / 5%);
  border-radius: 39px;
  color: white;
  font-size: 14px;
  padding: 6px 2em 6px 8px;
  cursor: pointer;

  ${({ $open }) =>
    $open &&
    `background: linear-gradient(90.28deg,#242424 0%,#1f1f1f 100%);
    box-shadow: inset 0px -1px 0px rgb(129 129 129 / 15%), inset 0px 4px 25px rgb(0 0 0 / 25%);
    border: 1px solid transparent;
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    `
  width: 100%
  `}
`

const StyledIcon = styled.svg`
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1em;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5em;
  position: absolute;
  pointer-events: none;
`

const StyledInput = styled.input`
  left: 0;
  width: 100%;
  bottom: 0;
  opacity: 0;
  position: absolute;
  pointer-events: none;
`

const StyledValue = styled.span<{ $asPlaceholder: boolean }>`
  ${({ $asPlaceholder }) => $asPlaceholder && `opacity: 0.5;`}
`

export const Select: React.FC<SelectProps> = React.forwardRef((props, ref: any) => {
  const {
    fullWidth,
    value: valueProp,
    IconComponent,
    defaultValue = '',
    onChange,
    children,
    inputProps,
    inputRef,
    onToggle,
    container,
    disablePortal,
    placeholder = 'Select...',
    className,
    ...restProps
  } = props
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
  })
  const [anchorEl, setAnchorEl] = React.useState()
  const open = !!anchorEl
  let display

  const handleChange = React.useCallback(
    (event: any) => {
      setValue(event.target.value)
      if (onChange) {
        onChange(event)
      }
    },
    [onChange, setValue]
  )

  const toggleOptions = React.useCallback(
    (event?: any) => {
      event?.stopPropagation()
      const newAnchorEl = anchorEl ? null : event?.currentTarget
      setAnchorEl(newAnchorEl)
      if (onToggle) {
        onToggle(!!newAnchorEl)
      }
    },
    [anchorEl, onToggle]
  )

  const onSelectOption = React.useCallback(
    (selectedValue: number | string) => {
      handleChange({ target: { value: selectedValue } })
      toggleOptions()
    },
    [toggleOptions, handleChange]
  )

  const options = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return null
    }
    const { onClick: childClick, value: childValue, label, ...childProps } = child.props
    const hasValueProp = childValue !== undefined
    const computedChildValue =
      !hasValueProp && typeof childProps.children === 'string' ? childProps.children : childValue
    const selected = computedChildValue === value
    if (selected) {
      display = label || (typeof childProps.children === 'string' ? childProps.children : childValue)
    }

    const handleClick = (event: any) => {
      onSelectOption(computedChildValue)
      if (childClick) {
        childClick(event)
      }
    }

    const optionProps = {
      onClick: handleClick,
      selected,
      ...childProps,
    }

    if (child.type === 'option') return <Option {...optionProps} />

    return React.cloneElement(child, props)
  })

  return (
    <StyledRoot ref={ref} $fullWidth={fullWidth} $open={open} onMouseDown={toggleOptions} className={className}>
      <StyledValue $asPlaceholder={display === undefined}>{display ?? placeholder}</StyledValue>
      <StyledInput value={value} onChange={handleChange} ref={inputRef} {...inputProps} {...restProps} />
      <Options
        anchorEl={anchorEl}
        open={open}
        onClose={toggleOptions}
        container={container}
        disablePortal={disablePortal}
      >
        {options}
      </Options>
      <StyledIcon as={IconComponent} aria-hidden />
    </StyledRoot>
  )
})

Select.defaultProps = {
  IconComponent: (props) => (
    <svg focusable="false" width="14" height="8" viewBox="0 0 14 8" fill="none" {...props}>
      <path
        opacity="0.5"
        d="M12.7072 1.35352L7.70718 6.35352C7.31666 6.74404 6.68349 6.74404 6.29297 6.35352L1.29297 1.35352"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  native: false,
}

export default Select
