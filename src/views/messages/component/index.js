import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

import '../cart.scss'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))
// https://api.ipify.org?format=json
const client = new W3CWebSocket('ws://localhost:3030/ws', 'optionalProtocol')

const MessageComponent = props => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [message, setMessage] = useState()
  const [messages, setMessages] = useState([])
  // const [isConnected, setIsConnected] = useState()
  const [recMessage, setRecMessage] = useState()

  var connected = false

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

  const submitInitMessage = data => {
    const { ip } = data
    const initData = { user: name, msgType: 'IDENTIFICATION', ip }
    client.send(JSON.stringify(initData))

    // const data = { message: message, msgType: 'SEND_MSG' }
    // client.send(JSON.stringify(data))
    // setMessage(message)
    // setMessages([...messages, message])
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
      connected = true
    }
    client.onmessage = message => {
      setRecMessage(message.data)
      console.log(message, 'data recieved')
    }

    // axios.get('http://127.0.0.1:3000' + '/api').then(res => {
    //   const message = res.data
    //   setResponse({ message })
    // })

    axios.get('https://api.ipify.org?format=json').then(res => {
      const ipData = res.data

      console.log(ipData, 'ipdata')

      console.log(connected, 'isConnected')
      connected
        ? setTimeout(() => submitInitMessage(ipData), 3000)
        : (connected = false)
    })
  }, [])
  return (
    <>
      <div className='cart'>
        <form className={classes.root} noValidate autoComplete='off'>
          <div>
            <TextField
              id='standard-basic'
              label='Login Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button onClick={handleSubmit}>login</button>
          </div>
          <div>
            <TextField
              id='standard-basic'
              label='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button onClick={handleSubmitmessage}>send message</button>
          </div>
        </form>
        {recMessage && <p>message {recMessage} </p>}
        {messages && messages.map(message => <p>{message}</p>)}
      </div>
    </>
  )
}
export default MessageComponent
