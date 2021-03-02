import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'

import '../productList.scss'
import Card from '@material-ui/core/Card'

const ProductListComponent = props => {
  const { page } = props
  console.log(page, 'props')
  const data = localStorage.getItem('messageData')
  const dataObj = JSON.parse(JSON.parse(data))
  const [productListData, setProductsListData] = useState([])

  useEffect(() => {
    setProductsListData(dataObj.outputData)
  }, 0)
  // const { taxPrice, totalPrice, shippingPrice } = productListData
  console.log(productListData, 'data')

  // { category } description,
  // id,
  // image,
  // price,
  // productName,
  // title,

  return (
    <>
      {productListData &&
        productListData.map((product, index) => (
          <Card
            key={index}
            className={`product__card ${
              page.isPage === 'listing' ? 'no__bar' : 'bar'
            }`}
          >
            <>
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className='product__image'
                />
                <h2 className='product__title'>{product.productName}</h2>
                <p className='product__description'>{product.description}</p>
                <p className='product__price'>Prics : ${product.price}</p>
                <a href='/product'>
                  <Button variant='contained' color='primary'>
                    Add to cart
                  </Button>
                </a>
              </div>
            </>
          </Card>
        ))}
    </>
  )
}

export default ProductListComponent
