var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var Rooms = require('./src/mongooseSetup.js').Rooms
var Msgs = require('./src/mongooseSetup.js').Msgs
// console.log(Rooms);
// console.log(Msgs);
var messages = [
  {room: 'general', messages: ['first general', 'second general']},
  {room: 'cats', messages: ['first', 'second']}
]

app.use(express.static('public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', function (socket) {
  console.log('connection')
  socket.room = 'general'
  socket.join('general')
  console.log(socket.id)

  socket.on('chat', function (msg) {
    console.log(socket.room)
    messages.filter(roomObj => roomObj.room === socket.room)
    console.log(msg)
    io.emit('chat', msg)
  })
  socket.on('getRooms', function () {
    Rooms.find({}, 'room',(err, rooms) => {
      if (err) console.error(err)
      console.log(rooms)
    })
  })
  socket.on('changeRoom', function (data) {
    socket.room = data
    socket.join(data)
    io.to( socket.id ).emit('fetchMsgs', messages
      .filter(roomObj => roomObj.room === socket.room)
      .map(obj => obj.messages)
      .reduce((pre, cur) => { pre.concat(cur) }))
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})
