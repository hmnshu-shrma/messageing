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

let userData = {}

router.post('/api/data', (req, res) => {
  // eventEmitter.emit(userData.receiverId, req.body, userData.wsId)
  console.log(req)
  res.send('success')
})

const server = app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})

const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const inputData = JSON.parse(message)
    userData = inputData
    userData.wsId = ws.id
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
