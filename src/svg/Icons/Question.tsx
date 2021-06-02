import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="11" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.77881 9.33526C9.95793 8.82608 10.3115 8.39672 10.7768 8.12322C11.2422 7.84973 11.7893 7.74976 12.3213 7.84101C12.8533 7.93226 13.3359 8.20885 13.6835 8.62179C14.0311 9.03473 14.2213 9.55737 14.2205 10.0971C14.2205 11.6209 11.9349 12.3828 11.9349 12.3828V13.5222"
        stroke="#929292"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="1" fill="#929292" />
    </Svg>
  )
}

export default Icon
