import React from 'react'
// import './landing.scss'
import './cart.scss'
import CartComponent from './component/'

const cartContainer = props => {
  return (
    <>
      <div className='cartContainer'>
        <CartComponent />
      </div>
    </>
  )
}

export default cartContainer
