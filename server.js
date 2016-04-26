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
  {room: 'cats', messages: ['first', 'second']},
  {room: 'random', messages: ['first random', 'second random']}
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
    msg.room = socket.room
    msg.time = '' + Date.now()
    msg.edited = false
    console.log(msg)
    Msgs.create(msg, (err, newMsg) => {
      if (err) return console.error(err)
      console.log(newMsg)
      io.emit('chat', newMsg)
    })
  })
  socket.on('getRooms', function () {
    Rooms.find({}, 'room',(err, rooms) => {
      if (err) console.error(err)
      var roomsArr = rooms.map(obj => obj.room)
      console.log(roomsArr)
      io.to(socket.id).emit('getRooms', roomsArr)
    })
  })
  socket.on('changeRoom', function (data) {
    socket.room = data
    socket.join(data)
    Msgs.find({room: data}).sort({$natural:-1}).limit(25).exec((err, messages) =>{
      console.log(messages.reverse())
    io.to( socket.id ).emit('fetchMsgs', messages
      .filter(roomObj => roomObj.room === socket.room)
    )


    })
  })
})



http.listen(3000, function () {
  console.log('listening on *:3000')
})
