import React from 'react'
import styled, { css } from 'styled-components'
import GravisSpinner from '../GravisSpinner'
import { useTranslation } from 'react-multi-lang'

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   60% { transform: scale(1.1); }
//   100% { transform: scale(1); }
// `

const Wrapper = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${({ fill }) => (fill ? '#1C1C1C' : 'transparent')};
  display: flex;
  > div > * {
    margin: auto;
  }

  ${(props) =>
    props.height
      ? css`
          height: ${props.height};
        `
      : css`
          height: 180px;
        `}
`

// const AnimatedImg = styled.div`
//   animation: ${pulse} 800ms linear infinite;
//   & > * {
//     width: 72px;
//   }
// `

const LocalLoader = ({ fill, global, height }) => {
  const t = useTranslation()
  return (
    <Wrapper fill={fill} height={height}>
      {/*<AnimatedImg>*/}
      {/*  <img src={require('../../assets/logo.png')} alt="loading-icon" />*/}
      {/*</AnimatedImg>*/}
      <div>
        <GravisSpinner />
        {global && (
          <p style={{ marginTop: '20px', color: 'white', textAlign: 'center', fontSize: '18px', lineHeight: '25px' }}>
            {t('pleaseWait')}
            <br /> {t('itCouldTakeMinutes')}
          </p>
        )}
      </div>
    </Wrapper>
  )
}

export default LocalLoader
