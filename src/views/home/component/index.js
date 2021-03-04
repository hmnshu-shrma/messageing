import React from 'react'
import Typography from '@material-ui/core/Typography'
import '../home.scss'
export default function HomeComponent() {
  return (
    <div className='new__background'>
      <Typography component='h1' variant='h1'>
        Welcome to Tech Mongers
      </Typography>

      <Typography component='h1' variant='h3'>
        Simplyfying your shopping experience.
      </Typography>
    </div>
  )
}
