import React, { useState, useEffect } from 'react'
import '../cart.scss'

const CartComponent = props => {
  const data = localStorage.getItem('messageData')
  const dataObj = JSON.parse(JSON.parse(data))
  const [productListData, setProductsListData] = useState({})

  useEffect(() => {
    setProductsListData(dataObj.outputData)
  }, [])
  const {
    taxPrice,
    totalPrice,
    shippingPrice,
    cartId,
    userName,
    cartItems
  } = productListData

  return (
    <>
      <div className='cart' id={cartId}>
        <h2 className='cart__header'>Items in to your cart</h2>
        {userName && (
          <p>
            Hi <strong>{userName}</strong> here is your cart
          </p>
        )}

        <ul className='cart__items'>
          {cartItems &&
            cartItems.map((product, index) => (
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
                <strong>Cart Total price</strong> : $ {totalPrice}
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
      </div>
    </>
  )
}

export default CartComponent
