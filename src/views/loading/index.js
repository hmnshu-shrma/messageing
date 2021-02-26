import React from 'react'
import './loading.scss'

const LandingContainer = props => {
  return (
    <>
      <div class='wrap'>
        <div class='loading'>
          <div class='bounceball' />
          <div class='text'>NOW LOADING</div>
        </div>
      </div>
    </>
  )
}

export default LandingContainer
