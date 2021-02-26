const express = require('express')
const router = express.Router()
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

router.get('/api', (req, res) => {
  res.json({ message: 'Hello World' })
})

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', function() {
    console.log('A user disconnected')
  })
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/', router)

app.listen(3000, () => {
  console.log('listening on *:3000')
})
