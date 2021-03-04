import React from 'react'
import './home.scss'
import HomeComponent from './component/'
const HomeContainer = props => {
  return (
    <>
      <div className='HomeContainer'>
        <HomeComponent page={props} />
      </div>
    </>
  )
}

export default HomeContainer
