import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M7.35463 8.6464L10.1467 5.8535C10.4616 5.5385 10.2386 5 9.79313 5L4.20735 5C3.76186 5 3.53879 5.53864 3.85384 5.8536L6.64752 8.6465C6.84281 8.84173 7.15939 8.84169 7.35463 8.6464Z"
        fill="white"
      />
    </Svg>
  )
}

export default Icon
