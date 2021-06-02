import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...props}>
      <path
        opacity="0.5"
        d="M17.7071 9.35352L12.7071 14.3535C12.3165 14.744 11.6834 14.744 11.2928 14.3535L6.29285 9.35352"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  )
}

export default Icon
