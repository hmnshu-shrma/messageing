import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Loading from '../../loading'
import '../productList.scss'
import Card from '@material-ui/core/Card'

const ProductListComponent = props => {
  const { page } = props
  console.log(page, 'props')
  const [productListData, setProductsListData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    fetch('https://fakestoreapi.com/products', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(response => {
        setProductsListData(response)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      {isLoading && <Loading />}
      {productListData &&
        productListData.map((product, index) => (
          <Card
            key={index}
            className={`product__card ${
              page.isPage === 'listing' ? 'no__bar' : 'bar'
            }`}
          >
            {product.image && product.price && (
              <>
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className='product__image'
                  />
                  <h2 className='product__title'>{product.title}</h2>
                  <p className='product__description'>${product.price}</p>
                  <a href='/product'>
                    <Button variant='contained' color='primary'>
                      Add to cart
                    </Button>
                  </a>
                </div>
              </>
            )}
          </Card>
        ))}
    </>
  )
}

export default ProductListComponent
