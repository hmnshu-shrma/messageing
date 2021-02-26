import React from 'react'
// import './landing.scss'
import './productDetail.scss'
import ProductDetailComponent from './component/'

const LandingContainer = props => {
  return (
    <>
      <div className='productContainer'>
        <ProductDetailComponent />
      </div>
    </>
  )
}

export default LandingContainer
