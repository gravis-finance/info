import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <circle cx="9.5" cy="8.5" r="6.5" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="8.5" r="2.5" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.862 9.11475C21.488 10.4182 22.5291 12.421 22.5291 14.6671C22.5291 18.595 19.3448 21.7793 15.4169 21.7793C13.0364 21.7793 10.9292 20.6098 9.63818 18.8141"
        stroke="#929292"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4976 12.8892C18.8002 13.4122 18.9733 14.0195 18.9733 14.6672C18.9733 16.6312 17.3812 18.2233 15.4172 18.2233C14.7695 18.2233 14.1622 18.0502 13.6392 17.7476"
        stroke="#929292"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon
