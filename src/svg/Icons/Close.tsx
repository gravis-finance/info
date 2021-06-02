import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7.75781 16.2426L16.2431 7.75733M7.75781 7.75732L16.2431 16.2426"
        stroke="#929292"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default Icon
