import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="15.5" cy="15.5" r="6.5" stroke="#929292" strokeWidth="2" fill="none" />
      <path
        d="M14 5.30506C13.0286 2.78666 10.585 1 7.72414 1C4.0105 1 1 4.0105 1 7.72414C1 10.585 2.78666 13.0286 5.30506 14"
        stroke="#929292"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}

export default Icon
