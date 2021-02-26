import React from 'react'
// import Button from '@material-ui/core/Button'
// import Loading from '../../loading'
import '../cart.scss'
// import { makeStyles } from '@material-ui/core/styles'
//
// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1)
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1)
//   }
// }))

const CartComponent = props => {
  // const classes = useStyles()

  const txt =
    'Your Payment is successfull you will recieve the order in 3-4 workign days.'

  return (
    <>
      <div className='cart'>
        <h2 className='cart__header'>Checkout</h2>
        <div className='cart__items'>
          <img
            src='https://images-na.ssl-images-amazon.com/images/I/71i2XhHU3pL._SX679_.jpg'
            alt='image'
            className='cart__image'
          />
          <div className='cart__details'>
            <h2>New Apple iPhone 11 (64GB) - Black</h2>
            <p>FREE garaunteed delivery by Tomorrow 9pm</p>
            <p>Quantity : 1</p>
            <p>Color: Space gray</p>
            <p>Size: 256Gb</p>
          </div>
        </div>
        <h2>{txt}</h2>
      </div>
    </>
  )
}

export default CartComponent
