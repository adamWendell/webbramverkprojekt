var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var roomsSchema = {
  room: String
}
var MsgSchema = {
  author: String,
  time: String,
  room: String
}

var Rooms = mongoose.model('Rooms', roomsSchema)
var Msgs = mongoose.model('Msgs', MsgSchema)

// Rooms.create({room:'general'}, (err, newRoom) => {
//   if (err) return console.error(err)
//   console.log(newRoom)
// })
// Rooms.create({room:'random'}, (err, newRoom) => {
//   if (err) return console.error(err)
//   console.log(newRoom)
// })
// Rooms.create({room:'cats'}, (err, newRoom) => {
//   if (err) return console.error(err)
//   console.log(newRoom)
// })

// Rooms.find(function (err, Room) {
//   if (err) return console.error(err)
//   console.log(Room)
// })
module.exports = {
  Rooms: Rooms,
  Msgs: Msgs
}
