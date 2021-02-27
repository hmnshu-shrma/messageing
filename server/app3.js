const express = require('express')
// const router = express.Router()
const app = express()

const PORT = 3030

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' })
})
app.post('/api/data', (req, res) => {
  eventEmitter.emit({ message: 'Hello World' })
  res.json()
})

const server = app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})

const WebSocket = require('ws')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const inputData = JSON.parse(message)
    // Subscripting
    if (inputData.msgType === 'IDENTIFICATION') {
      eventEmitter.on(inputData.id, outputMessage => {
        if (ws.readyState === ws.OPEN) {
          ws.send(outputMessage)
        } else {
          eventEmitter.removeAllListeners([inputData.id]) // remove all listeners registered with this ID.
          ws.terminate()
        }
      })
      return
    }

    // Sending
    if (inputData.msgType === 'SEND_MSG') {
      setTimeout(() => {
        eventEmitter.emit(inputData.receiverId, inputData.message, ws.id)
      }, 3000)
      return
    }

    // More message handlings ...
    ws.on('close', () => {
      // remember to un-sub
      eventEmitter.removeAllListeners([inputData.id])
      ws.terminate()
    })
  })
})
