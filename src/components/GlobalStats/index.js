import React, { useState } from 'react'
import styled from 'styled-components'
import { RowFixed, RowBetween } from '../Row'
import { useGlobalData, useEthPrice } from '../../contexts/GlobalData'
import { formattedNum, localNumber } from '../../utils'

import { TYPE } from '../../Theme'
import { getCurrentNetworkLinks } from '../../utils/data'
import { useTranslation } from 'react-multi-lang'

const Header = styled.div`
  width: 100%;
  position: relative;
  top: 0;
  margin-bottom: 32px;
`

const Medium = styled.span`
  font-weight: 500;
  color: #009ce1;
`

export default function GlobalStats() {
  const [, setShowPriceCard] = useState(false)
  const { oneDayVolumeUSD, oneDayTxns, pairCount } = useGlobalData()
  const [ethPrice] = useEthPrice()
  const formattedEthPrice = ethPrice ? formattedNum(ethPrice, true) : '-'
  const oneDayFees = oneDayVolumeUSD ? formattedNum(oneDayVolumeUSD * 0.0025, true) : ''

  const t = useTranslation()

  return (
    <Header>
      <RowBetween>
        <RowFixed>
          <TYPE.main
            mr={'26px'}
            onMouseEnter={() => {
              setShowPriceCard(true)
            }}
            onMouseLeave={() => {
              setShowPriceCard(false)
            }}
            style={{ position: 'relative' }}
          >
            {getCurrentNetworkLinks().TOKEN_TITLE} {t('price')}: <Medium>{formattedEthPrice}</Medium>
          </TYPE.main>
          <TYPE.main mr={'26px'}>
            {t('transactions24h')}: <Medium>{localNumber(oneDayTxns)}</Medium>
          </TYPE.main>
          <TYPE.main mr={'26px'}>
            {t('pairs')}: <Medium>{localNumber(pairCount)}</Medium>
          </TYPE.main>
          <TYPE.main mr={'26px'}>
            {t('fees24h')}: <Medium>{oneDayFees}</Medium>&nbsp;
          </TYPE.main>
        </RowFixed>
      </RowBetween>
    </Header>
  )
}
