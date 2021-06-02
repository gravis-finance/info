import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V18.7634C18 19.6278 16.9774 20.085 16.3332 19.5087L12.6668 16.2282C12.2872 15.8885 11.7128 15.8885 11.3332 16.2282L7.66679 19.5087C7.02261 20.085 6 19.6278 6 18.7634V6Z"
        stroke="#929292"
        strokeWidth="2"
      />
    </Svg>
  )
}

export default Icon
