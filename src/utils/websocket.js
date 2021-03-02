import axios from 'axios'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import store from '../store/index'
import { updateData } from '../store/action'

window.store = store
window.updateData = updateData

const client = new W3CWebSocket('ws://localhost:3030/ws', 'optionalProtocol')

export const webSocketHandler = () => {
  let connected = false
  let messageData
  client.onopen = () => {
    console.log('WebSocket Client Connected')
    connected = true
    store.dispatch(
      updateData({ title: 'React Redux Tutorial for Beginners', id: 1 })
    )
  }
  client.onmessage = message => {
    logMEssage(message.data)

    messageData = JSON.parse(message.data)
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
  return messageData
}

const logMEssage = data => {
  console.log(data, 'incomming')
}
const submitInitMessage = data => {
  const { ip } = data
  const initData = { user: 'himanshu', msgType: 'IDENTIFICATION', ip }
  client.send(JSON.stringify(initData))
  // const message = { message: 'hello', msgType: 'SEND_MSG' }
  // client.send(JSON.stringify(message))
}
