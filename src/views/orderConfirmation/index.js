import React from 'react'
// import './landing.scss'
import './cart.scss'
import OrderConfirmation from './component/'

const OrderConfirmationContainer = props => {
  return (
    <>
      <div className='cartContainer'>
        <OrderConfirmation page={props} />
      </div>
    </>
  )
}

export default OrderConfirmationContainer
