var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var roomsSchema = {
  room: String
}
var MsgSchema = {
  author: String,
  time: String,
  room: String,
  message: String,
  edited: Boolean
}

var Rooms = mongoose.model('Rooms', roomsSchema)
var Msgs = mongoose.model('Msgs', MsgSchema)

// for (var i = 0; i < 50000; i++) {
//   if (i % 3 === 0) {
//     Msgs.create({room: 'random', author: 'Me', time: Date.now(), message: `this is the ${i} message`}, (err, newRoom) => {
//       if (err) return console.error(err)
//       console.log(newRoom)
//     })
//   } else if (i % 2 === 0) {
//     Msgs.create({room: 'general', author: 'Me', time: Date.now(), message: `this is the ${i} message`}, (err, newRoom) => {
//       if (err) return console.error(err)
//       console.log(newRoom)
//     })
//   } else {
//     Msgs.create({room: 'cats', author: 'Me', time: Date.now(), message: `this is the ${i} message`}, (err, newRoom) => {
//       if (err) return console.error(err)
//       console.log(newRoom)
//     })
//   }
// }
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
