import React from 'react'
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

  // useEffect(() => {
  //   loadProducts()
  // }, [])
  //
  // const loadProducts = () => {
  //   fetch('https://fakestoreapi.com/products', {
  //     method: 'GET'
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       setProductsListData(response)
  //       setIsLoading(false)
  //     })
  //     .catch(error => console.log(error))
  // }

  return (
    <>
      <div className='productContainerDetails'>
        <img
          src='https://images-na.ssl-images-amazon.com/images/I/71i2XhHU3pL._SX679_.jpg'
          alt='image'
        />
        <div className='productList__details'>
          <h2>New Apple iPhone 11 (64GB) - Black</h2>
          <p>FREE delivery: Tomorrow Order within 8 hrs and 13 mins Details</p>
          <ul class='a-unordered-list a-vertical a-spacing-mini'>
            <li>
              <span class='a-list-item'>
                6.1-inch (15.5 cm) Liquid Retina HD LCD display
              </span>
            </li>

            <li>
              <span class='a-list-item'>
                Water and dust resistant (2 meters for up to 30 minutes, IP68)
              </span>
            </li>

            <li>
              <span class='a-list-item'>
                Dual-camera system with 12MP Ultra Wide and Wide cameras; Night
                mode, Portrait mode, and 4K video up to 60fps
              </span>
            </li>

            <li>
              <span class='a-list-item'>
                12MP TrueDepth front camera with Portrait mode, 4K video, and
                Slo-Mo
              </span>
            </li>

            <li>
              <span class='a-list-item'>Face ID for secure authentication</span>
            </li>

            <li>
              <span class='a-list-item'>
                A13 Bionic chip with third-generation Neural Engine
              </span>
            </li>

            <li>
              <span class='a-list-item'>Fast-charge capable</span>
            </li>
          </ul>

          <div className='product__description'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </div>
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
