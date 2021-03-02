import React, { useState, useEffect } from 'react'

import '../cart.scss'

const CartComponent = props => {
  const { page } = props
  console.log(page, 'props')
  const data = localStorage.getItem('messageData')
  const dataObj = JSON.parse(JSON.parse(data))
  const [productListData, setProductsListData] = useState({})

  useEffect(() => {
    setProductsListData(dataObj.outputData)
  }, 0)

  const { taxPrice, totalPrice, shippingPrice, delivered } = productListData

  const txt =
    'Your Payment is successfull you will recieve the order in 3-4 workign days.'

  return (
    <>
      <div className='cart'>
        <h2 className='cart__header'>Order Confirmation</h2>
        {productListData.orderItems &&
          productListData.orderItems.map((product, index) => (
            <div className='cart__items' key={index}>
              <div className='cart__details'>
                <h2>{product.productName}</h2>
                <p>FREE garaunteed delivery by Tomorrow 9pm</p>
                <p>Quantity : {product.productId}</p>
                <p>Color: Space gray</p>

                <p>
                  <strong>Price</strong> : {product.orderItemPrice}
                </p>
              </div>
            </div>
          ))}

        {delivered && <p>Item Is shipped</p>}
        {totalPrice && (
          <div>
            <h3>Price Details</h3>
            {totalPrice && (
              <p>
                <strong>Total price</strong> : $ {totalPrice}
              </p>
            )}
            {taxPrice && (
              <p>
                <strong>Tax price</strong> : ${taxPrice}
              </p>
            )}
            {shippingPrice && (
              <p>
                <strong>Shipping Price</strong> : ${shippingPrice}
              </p>
            )}
          </div>
        )}
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
