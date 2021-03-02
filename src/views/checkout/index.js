import React from 'react'
// import './landing.scss'
import './cart.scss'
import CheckoutComponent from './component/'

const CheckoutContainer = props => {
  return (
    <>
      <div className='cartContainer'>
        <CheckoutComponent page={props} />
      </div>
    </>
  )
}

export default CheckoutContainer
