/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
import React from 'react'

const useControlled = <T>({
  controlled,
  default: defaultProp,
}: {
  controlled: T
  default: T
}): [T, (newValue: T) => void] => {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const { current: isControlled } = React.useRef(controlled !== undefined)
  const [valueState, setValue] = React.useState(defaultProp)
  const value = isControlled ? controlled : valueState

  const setValueIfUncontrolled = React.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue)
    }
  }, [])

  return [value, setValueIfUncontrolled]
}

export default useControlled
