import React from 'react'
import '../home.scss'
import logo from '../../../logo.png'
const HomeComponent = props => {
  // const classes = useStyles()
  console.log(props)
  return (
    <>
      <div className='home'>
        <div className='wrapper'>
          <div className='Container'>
            <div className='nav'>
              <div className='logo'>
                <img src={logo} alt='logo' />
              </div>
              <div className='menu'>
                <ul className='navMenu'>
                  <li>
                    <a href='/home'>Home</a>
                  </li>
                  <li>
                    <a href='/listing'>Products</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='header'>
              <h1>Welcome to the Tech-Mongers</h1>
              <p>Enhancing your shopping experience</p>
              <button type='button'>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeComponent
