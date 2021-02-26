import asyncComponent from '../hoc/asyncComponents'

const AsyncLanding = asyncComponent(() => import('../views/productListing'))
const AsyncProductDetailComponent = asyncComponent(() =>
  import('../views/productDetails')
)
const AsyncCart = asyncComponent(() => import('../views/cartPage'))
const AsyncCheckout = asyncComponent(() => import('../views/checkout'))
const AsyncHome = asyncComponent(() => import('../views/home'))
const AsyncOrderConfirmation = asyncComponent(() =>
  import('../views/orderConfirmation')
)
const AsyncMessages = asyncComponent(() => import('../views/messages'))
// const AsyncDropPage = asyncComponent(() => import('../views/drop'))

const ROUTES = [
  // {
  //   path: '/drop',
  //   component: AsyncDropPage
  // },
  {
    path: '/order-confirmation',
    component: AsyncOrderConfirmation
  },
  {
    path: '/messages',
    component: AsyncMessages
  },
  {
    path: '/checkout',
    component: AsyncCheckout
  },
  {
    path: '/home',
    component: AsyncHome
  },
  {
    path: '/cart',
    component: AsyncCart
  },
  {
    path: '/product',
    component: AsyncProductDetailComponent
  },
  {
    path: '/listing',
    component: AsyncLanding
  },
  {
    path: '/',
    component: AsyncHome
  }
]

export default ROUTES
