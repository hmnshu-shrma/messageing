import React, { useState, useEffect } from 'react'
import '../cart.scss'

const CheckoutComponent = props => {
  const txt =
    "You'll be recieveing the payment link in 5 seconds on your registered number."
  const data = localStorage.getItem('messageData')
  const dataObj = JSON.parse(JSON.parse(data))
  const [productListData, setProductsListData] = useState({})

  useEffect(() => {
    setProductsListData(dataObj.outputData)
  }, 0)
  const { taxPrice, totalPrice, shippingPrice } = productListData

  return (
    <>
      <div className='cart'>
        <h2 className='cart__header'>Checkout</h2>
        <ul className='cart__items'>
          {productListData.orderItems &&
            productListData.orderItems.map((product, index) => (
              <li className='cart__item' key={index}>
                {product.imageUrl && (
                  <img className='image' src={product.imageUrl} />
                )}
                <div className='cart__details'>
                  <h2>{product.productName}</h2>
                  {product.quantity && <p>Quantity : {product.quantity}</p>}
                  <p>
                    <strong>Price</strong> : {product.orderItemPrice}
                  </p>
                </div>
              </li>
            ))}
        </ul>
        {totalPrice && (
          <div className='price_details'>
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

        {productListData && productListData.shippingAddress && (
          <p>
            <strong> Shipping Address </strong>:{' '}
            {productListData.shippingAddress.addressLine1} ,{' '}
            {productListData.shippingAddress.addressLine2},
            {productListData.shippingAddress.city}{' '}
          </p>
        )}
      </div>
      <h2>{txt}</h2>
    </>
  )
}

export default CheckoutComponent
