import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M10.9849 13.2803L7.23486 9.53032C6.94197 9.23743 6.94197 8.76256 7.23486 8.46966L10.9849 4.71967"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default Icon
