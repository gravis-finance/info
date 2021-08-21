import React from 'react'

export type ClickAwayListenerProps = {
  onClickAway?: (event: React.MouseEvent<Document>) => void
  mouseEvent?: 'onClick' | 'onMouseDown'
  children: any
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = (props) => {
  const { onClickAway, mouseEvent = 'onClick', children } = props
  const childrenRef = React.useRef()
  const eventName = React.useMemo(() => mouseEvent.substring(2).toLowerCase(), [mouseEvent])

  const childrenPropsHandler = React.useCallback(
    (event) => {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
      const childrenProps: any = children.props
      const handler = childrenProps[mouseEvent]
      if (handler) {
        handler(event)
      }
    },
    [children.props, mouseEvent]
  )

  const childrenProps = {
    ref: childrenRef,
    [mouseEvent]: childrenPropsHandler,
  }

  const clickAwayListener = React.useCallback(
    (event: any) => {
      if (onClickAway) {
        const childrenNode: any = childrenRef.current
        if (childrenNode && !childrenNode.contains(event.target)) {
          onClickAway(event)
        }
      }
    },
    [onClickAway]
  )

  React.useEffect(() => {
    if (eventName) {
      document.addEventListener(eventName, clickAwayListener)

      return () => {
        document.removeEventListener(eventName, clickAwayListener)
      }
    }

    return undefined
  }, [eventName, clickAwayListener])

  return React.cloneElement(children, childrenProps)
}

ClickAwayListener.defaultProps = {
  mouseEvent: 'onClick',
}

export default ClickAwayListener
