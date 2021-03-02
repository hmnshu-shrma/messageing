import React, { useState, useEffect } from 'react'

import '../cart.scss'

const CartComponent = props => {
  const { page } = props
  console.log(page, 'props')
  const data = localStorage.getItem('messageData')
  const dataObj = JSON.parse(JSON.parse(data))
  const [productListData, setProductsListData] = useState()

  useEffect(() => {
    setProductsListData(dataObj.outputData)
  }, 0)
  console.log(productListData)
  const txt =
    'Your Payment is successfull you will recieve the order in 3-4 workign days.'

  return (
    <>
      <div className='cart'>
        <h2 className='cart__header'>Order Confirmation</h2>
        {orderItems &&
          orderItems.map((product, index) => (
            <div className='cart__items'>
              <img
                src='https://images-na.ssl-images-amazon.com/images/I/71i2XhHU3pL._SX679_.jpg'
                alt='image'
                className='cart__image'
              />
              <div className='cart__details'>
                <h2>{product.productName}</h2>
                <p>FREE garaunteed delivery by Tomorrow 9pm</p>
                <p>Quantity : {product.productId}</p>
                <p>Color: Space gray</p>
                <p>Size: 256Gb</p>
              </div>
            </div>
          ))}
        {productListData && productListData.billingAddress && (
          <p>
            <strong> Billing Address </strong>:{' '}
            {productListData.billingAddress.addressLine1} ,{' '}
            {productListData.billingAddress.addressLine2},
            {productListData.billingAddress.city}{' '}
          </p>
        )}
        <h2>{txt}</h2>
      </div>
    </>
  )
}

export default CartComponent
