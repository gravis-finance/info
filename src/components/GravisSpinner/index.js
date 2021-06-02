import React, { lazy, Suspense } from 'react'
import gravisSpinnerJson from './gravisSpinnerJson.json'
import gravisSmallSpinnerJson from './gravisSmallSpinnerJson.json'

const LazyLottie = lazy(() => import('react-lottie-player'))

const GravisSpinner = ({ small }) => {
  return (
    <Suspense fallback={null}>
      <LazyLottie
        loop
        animationData={!small ? gravisSpinnerJson : gravisSmallSpinnerJson}
        play
        style={{ height: '120px', width: '120px' }}
      />
    </Suspense>
  )
}

export default GravisSpinner
