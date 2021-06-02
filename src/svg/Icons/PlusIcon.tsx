import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 6V18" stroke="#009CE1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 12.0002H6" stroke="#009CE1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Icon
