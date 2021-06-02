import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <path
        d="M19.8969 5.64401L13.7173 11.8237L11.091 9.1974L4.50012 15.7528"
        stroke="#929292"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.7351 9.04216V4.92188L16.5684 4.92188"
        stroke="#929292"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.769 15.827L16.3271 19.2632L13.5793 16.5155L9.07883 21.0002L5.99805 20.96M20.6528 19.1242V15.0039H16.4861"
        stroke="#929292"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon
