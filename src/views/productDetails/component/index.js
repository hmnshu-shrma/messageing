import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
// import Loading from '../../loading'
import '../productDetail.scss'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))

const ProductDetailComponent = props => {
  // const [productListData, setProductsListData] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  const data = localStorage.getItem('messageData')
  const dataObj = JSON.parse(JSON.parse(data))
  const [productData, setProductsData] = useState({})

  useEffect(() => {
    setProductsData(dataObj.outputData)
  }, 0)

  const { category, description, id, image, price, productName } = productData

  // const { taxPrice, totalPrice, shippingPrice } = productData

  console.log(productData, 'productData')

  return (
    <>
      <div className='productContainerDetails' id={category}>
        {image && productName && (
          <img className='product__image' src={image} alt={productName} />
        )}
        <div className='productList__details'>
          {productName && <h2 id={id}>{productName}</h2>}

          {price && <p className='price'>Price : ${price}</p>}

          {description && (
            <p className='product__description'>About Product:{description}</p>
          )}

          <a href='/cart'>
            <Button
              variant='contained'
              size='large'
              color='primary'
              className={classes.margin}
            >
              Buy Now
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}

export default ProductDetailComponent
