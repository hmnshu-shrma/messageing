import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import './landing.scss'
import './home.scss'
import HomeComponent from './component/'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import TextField from '@material-ui/core/TextField'

// import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

const client = new W3CWebSocket('ws://127.0.0.1:3030')

const HomeContainer = props => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [message, setMessage] = useState()
  const [recMessage, setRecMessage] = useState()

  const handleSubmit = evt => {
    evt.preventDefault()
    console.log(`Submitting Name ${name}`)

    const data = { user: name, msgType: 'IDENTIFICATION' }
    client.send(JSON.stringify(data))
  }

  const handleSubmitmessage = evt => {
    evt.preventDefault()
    console.log(`Submitting Message ${name}`)
    const data = { message: message, msgType: 'SEND_MSG' }
    client.send(JSON.stringify(data))
    setMessage(message)
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    client.onmessage = message => {
      setRecMessage(message.data)
      console.log(message, 'data recieved')
    }

    // axios.get('http://127.0.0.1:3000' + '/api').then(res => {
    //   const message = res.data
    //   setResponse({ message })
    // })
  }, [])

  return (
    <>
      <div className='cartContainer'>
        {recMessage && <p>message {recMessage} </p>}
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            id='standard-basic'
            label='Login Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            id='standard-basic'
            label='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit}>login</button>
          <button onClick={handleSubmitmessage}>send message</button>
        </form>
        <HomeComponent />
      </div>
    </>
  )
}

export default HomeContainer
