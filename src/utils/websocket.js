import axios from 'axios'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
const client = new W3CWebSocket('ws://localhost:3030/ws', 'optionalProtocol')

export const webSocketHandler = () => {
  let connected = false
  client.onopen = () => {
    console.log('WebSocket Client Connected')
    connected = true
  }
  client.onmessage = message => {
    console.log(message.data, 'data recieved')
    const messageData = JSON.parse(message.data)
    if (messageData && messageData.pageName) {
      window.location = `/${messageData.pageName}`
    }
  }
  axios.get('https://api.ipify.org?format=json').then(res => {
    const ipData = res.data
    console.log(ipData, 'ipdata')
    console.log(connected, 'isConnected')
    connected
      ? setTimeout(() => submitInitMessage(ipData), 1000)
      : (connected = false)
  })
}

const submitInitMessage = data => {
  const { ip } = data
  const initData = { user: 'himanshu', msgType: 'IDENTIFICATION', ip }
  client.send(JSON.stringify(initData))
  const message = { message: 'hello', msgType: 'SEND_MSG' }
  client.send(JSON.stringify(message))
}