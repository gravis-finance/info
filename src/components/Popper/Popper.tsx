import React from 'react'
import { usePopper } from 'react-popper'
import { createPortal } from 'react-dom'
import { Options, VirtualElement } from '@popperjs/core'

export type PopperProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  container?: Element
  disablePortal?: boolean
  open?: boolean
  placement?: Options['placement']
  anchorEl?: null | VirtualElement | Element
  modifiers?: Options['modifiers']
  children?: React.ReactNode | ((props: ReturnType<typeof usePopper>) => React.ReactNode)
  inheritWidth?: boolean
}

const Popper = React.forwardRef((props: PopperProps, ref) => {
  const {
    anchorEl,
    placement,
    disablePortal = false,
    container = document.body,
    open,
    children,
    modifiers: modifiersProp,
    inheritWidth,
    ...restProps
  } = props
  const [popperElement, setPopperElement] = React.useState<any>()
  React.useImperativeHandle(ref, () => popperElement, [popperElement])

  const modifiers = React.useMemo(() => {
    const popperModifiers: Options['modifiers'] = []
    if (inheritWidth) {
      popperModifiers.push({
        name: 'followWidth',
        enabled: true,
        fn: ({ state }) => {
          // eslint-disable-next-line
          state.styles.popper.minWidth = `${state.rects.reference.width}px`
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      })
    }
    if (modifiersProp?.length) {
      popperModifiers.push(...modifiersProp)
    }
    return popperModifiers
  }, [inheritWidth, modifiersProp])

  const popper = usePopper(anchorEl, popperElement, { placement, modifiers })
  const { styles, attributes } = popper

  if (!open) return null

  const popperContent = (
    <div ref={setPopperElement} role="tooltip" style={styles.popper} {...attributes.popper} {...restProps}>
      {typeof children === 'function' ? children(popper) : children}
    </div>
  )

  return disablePortal ? popperContent : createPortal(popperContent, container)
})

export default Popper
