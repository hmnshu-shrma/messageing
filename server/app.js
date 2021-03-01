const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')

const WebSocket = require('ws')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

const PORT = 3030

app.use('/', router)
router.get('/api', (req, res) => {
  res.json({ message: 'Hello World' })
})
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
let userData = {} // to temporarly store userData
router.post('/api/data', bodyParser.json(), (req, res) => {
  const messageData = JSON.stringify(req.body)
  eventEmitter.emit(userData.receiverId, messageData, userData.wsId)
  console.log(req.body)

  // res.sendStatus(200)
  res.send('success')
})

const server = app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
const wss = new WebSocket.Server({ server, path: '/ws' })

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
    const inputData = JSON.parse(message)
    userData = inputData
    userData.wsId = req.headers['sec-websocket-key']
    // Subscripting
    if (inputData.msgType === 'IDENTIFICATION') {
      eventEmitter.on(userData.wsId, outputMessage => {
        if (ws.readyState === ws.OPEN) {
          ws.send(outputMessage)
        } else {
          eventEmitter.removeAllListeners([userData.wsId]) // remove all listeners registered with this ID.
          ws.terminate()
        }
      })
      return
    }

    // Sending
    if (inputData.msgType === 'SEND_MSG') {
      eventEmitter.emit(inputData.receiverId, inputData.message, userData.wsId)
      return
    }

    // More message handlings ...
    ws.on('close', () => {
      // remember to un-sub
      eventEmitter.removeAllListeners([userData.wsId])
      ws.terminate()
    })
  })
})
