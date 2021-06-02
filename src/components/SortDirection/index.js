import React from 'react'
import { ArrowDownIcon } from '../../svg'

export default function SortDirection({ found, sortDirection }) {
  if (found) {
    if (sortDirection) return <ArrowDownIcon width="14px" height="14px" />
    else return <ArrowDownIcon width="14px" height="14px" style={{ transform: 'rotate(180deg)' }} />
  } else return <ArrowDownIcon width="14px" height="14px" style={{ opacity: '0' }} />
}
