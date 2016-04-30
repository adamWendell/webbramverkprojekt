var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var Msgs = require('./src/mongooseSetup.js').Msgs

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
    Msgs.find().distinct('room', (err, rooms) => {
      if (err) {
        console.log(err)
      }
      io.to(socket.id).emit('getRooms', rooms.reverse())
    })
  })
  socket.on('changeRoom', function (data) {
    socket.room = data
    socket.join(data)
    Msgs.find({room: data}).sort({$natural: -1}).limit(25).exec((err, messages) => {
      if (err) {
        console.log(err)
      }
      io.to( socket.id ).emit('fetchMsgs',
        messages.filter(roomObj => roomObj.room === socket.room)
        .reverse()
        .reduce((pre, cur) => {
          pre.messages.push(cur)
          return pre
        }, {room: socket.room, messages: []})
      )
    })
  })

  socket.on('delete', (data) => {
    console.log(data)
    Msgs.findOneAndRemove({_id: data._id}, (err, removed) => {
      if (err) {
        console.log(err)
      }
      io.emit('delete', removed)
    })
  })
  socket.on('update', (data) => {
    console.log(data)
    Msgs.findOneAndUpdate({_id: data._id}, data, {new: true}, (err, updated) => {
      if (err) {
        console.log(err)
      }
      io.emit('update', updated)
    })
  })
})

function updatePopularRoom () {
  Msgs.mapReduce({
    map: function () {
      emit(this.room, 1)
    },
    reduce: function (key, vals) {
      return Array.sum(vals)
    },
    verbose: true,
    limit: 300,
    sort: {$natural: -1}
  }, (err, result, stats) => {
    if (err) {
      console.log(err)
    }
    io.emit('mostPopularRoom', result)
  })
}

setInterval(updatePopularRoom, 500)
http.listen(3000, function () {
  console.log('listening on *:3000')
})
