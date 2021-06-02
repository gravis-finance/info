import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 9C4 8.37049 4.29639 7.77771 4.8 7.4L11.1 2.675C11.6333 2.275 12.3667 2.275 12.9 2.675L19.2 7.4C19.7036 7.77771 20 8.37049 20 9V20C20 20.5523 19.5523 21 19 21H15.5C14.9477 21 14.5 20.5523 14.5 20V15C14.5 14.4477 14.0523 14 13.5 14H10.5C9.94772 14 9.5 14.4477 9.5 15V20C9.5 20.5523 9.05228 21 8.5 21H5C4.44772 21 4 20.5523 4 20V9Z"
        stroke="#929292"
        strokeWidth="2"
      />
    </Svg>
  )
}

export default Icon
