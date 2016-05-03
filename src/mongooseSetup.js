var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var MsgSchema = {
  author: String,
  time: String,
  room: String,
  message: String,
  edited: Boolean
}

var Msgs = mongoose.model('Msgs', MsgSchema)

// var arrayOfMessages = []
// for (var i = 0; i < 50000; i++) {
//   if (i % 3 === 0) {
//     arrayOfMessages.push({room: 'random', author: 'Me', time: Date.now(), message: `this is the ${i} message`})
//   } else if (i % 2 === 0) {
//     arrayOfMessages.push({room: 'general', author: 'Me', time: Date.now(), message: `this is the ${i} message`})
//   } else {
//     arrayOfMessages.push({room: 'cats', author: 'Me', time: Date.now(), message: `this is the ${i} message`})
//   }
// }
// Msgs.collection.insert(arrayOfMessages, (err, docs) => {
//   if (err) console.error(err)
// })

// Rooms.find(function (err, Room) {
//   if (err) return console.error(err)
//   console.log(Room)
// })
module.exports = {
  Msgs: Msgs
}
