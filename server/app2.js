const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3030 })

wss.getUniqueID = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4()
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    ws.id = wss.getUniqueID()
    console.log(ws.id, 'incoming data')

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })

    wss.clients.forEach(function each(client) {
      client.send(data)
    })
  })
})
