import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14.6465 17.7071L9.64648 12.7071C9.25596 12.3166 9.25596 11.6834 9.64648 11.2929L14.6465 6.29291"
        stroke="#929292"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default Icon
