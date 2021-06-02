import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18.2495 10.9999C18.2495 15.004 15.0036 18.2499 10.9995 18.2499C6.99545 18.2499 3.74951 15.004 3.74951 10.9999C3.74951 6.99587 6.99545 3.74994 10.9995 3.74994C15.0036 3.74994 18.2495 6.99587 18.2495 10.9999Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M20.9995 20.9999L16.6495 16.6499" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  )
}

export default Icon
