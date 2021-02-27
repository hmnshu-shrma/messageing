import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import '../cart.scss'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))
const client = new W3CWebSocket('ws://localhost:3030/api/ws')

const MessageComponent = props => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [message, setMessage] = useState()
  const [messages, setMessages] = useState([])
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
    setMessages([...messages, message])
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
      <div className='cart'>
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
        {recMessage && <p>message {recMessage} </p>}
        {messages && messages.map(message => <p>{message}</p>)}
      </div>
    </>
  )
}
export default MessageComponent
