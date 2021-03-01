import React from 'react'
import './home.scss'
import HomeComponent from './component/'
const HomeContainer = props => {
  window.location = '/messages'
  return (
    <>
      <div className='cartContainer'>
        <HomeComponent />
      </div>
    </>
  )
}

export default HomeContainer
