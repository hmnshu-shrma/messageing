import React from 'react'
// import './landing.scss'
import './productList.scss'
import ProductListComponent from './component/'

const ProductListContainer = props => {
  return (
    <>
      <div
        className={`productContainer ${
          props.isPage === 'listing' ? 'no__bar' : 'bar'
        }`}
      >
        <ProductListComponent page={props} />
      </div>
    </>
  )
}

export default ProductListContainer
