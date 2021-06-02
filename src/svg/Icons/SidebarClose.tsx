import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="46" height="134" viewBox="0 0 46 134" fill="none" {...props}>
      <path
        d="M25.8516 41.344C28.5053 38.5553 29.9854 34.8531 29.9854 31.0035V0H45.9854V134H29.9854V104.996C29.9854 101.147 28.5053 97.4447 25.8516 94.656L13.6055 81.7873C6.25658 74.0647 6.25658 61.9353 13.6055 54.2127L25.8516 41.344Z"
        fill="#1C1C1C"
      />
      <path
        d="M25.4853 73L19.8174 67.7434C19.3747 67.3328 19.3747 66.6672 19.8174 66.2566L25.4854 61"
        stroke="#404040"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default Icon
