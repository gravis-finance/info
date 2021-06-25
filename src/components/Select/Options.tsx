import React from 'react'
import styled from 'styled-components'
import { Popper } from '../Popper'
import { ClickAwayListener } from '../ClickAwayListener'

type Props = React.ComponentProps<typeof Popper> & {
  onClose?: (event: React.MouseEvent<Document>) => void
}

const StyledPopper = styled(Popper)`
  z-index: 9999;
`

const StyledOptions = styled.div`
  border-radius: 6px;
  background: linear-gradient(90.28deg, #292929 0%, #242424 100%), linear-gradient(0deg, #ffffff, #ffffff);
  border: 1px solid rgba(46, 46, 46, 1);
`

const Options: React.FC<Props> = (props) => {
  const { anchorEl, children, className, onClose, open, ...restProps } = props

  return (
    <ClickAwayListener onClickAway={open ? onClose : undefined} mouseEvent="onMouseDown">
      <StyledPopper anchorEl={anchorEl} open={open} inheritWidth placement="bottom-start" {...restProps}>
        <StyledOptions className={className}>{children}</StyledOptions>
      </StyledPopper>
    </ClickAwayListener>
  )
}

export default Options
