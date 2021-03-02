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

  const { orderId, orderStatus, taxPrice, totalPrice } = productListData
  console.log(productListData, 'data')
  console.log(orderId, 'orderId')
  console.log(orderStatus, 'orderStatus')
  console.log(taxPrice, 'taxPrice')
  console.log(totalPrice, 'totalPrice')

  // console.log(productListData.orderItems, 'data')
  const txt =
    'Your Payment is successfull you will recieve the order in 3-4 workign days.'

  return (
    <>
      <div className='cart'>
        <h2 className='cart__header'>Order Confirmation</h2>

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
