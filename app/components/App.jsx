import React from 'react'
import MessageList from './MessageList.jsx'
import Rooms from './Rooms.jsx'
import WriteMsg from './WriteMsg.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: [],
      currentRoom: 'general',
      msgsInRoom: []
    }
    this.getRooms = this.getRooms.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.handleNewMsg = this.handleNewMsg.bind(this)
    this.handleMsgStateUpdates = this.handleMsgStateUpdates.bind(this)
    this.getIndexOfRoom = this.getIndexOfRoom.bind(this)
    this.getIndexOfRoom = this.getIndexOfRoom.bind(this)
    this.getIndexOfMsg = this.getIndexOfMsg.bind(this)
    this.updateMsg = this.updateMsg.bind(this)
    this.deleteMsg = this.deleteMsg.bind(this)
  }
  componentWillMount () {
    socket.emit('changeRoom', this.state.currentRoom)
    socket.on('chat', this.handleNewMsg)
    socket.on('fetchMsgs', (roomAndMsgObj) => {
      if (this.getIndexOfRoom(roomAndMsgObj.room) < 0) {
        this.setState({msgsInRoom: this.state.msgsInRoom.concat(roomAndMsgObj)})
      }
    })
    socket.on('delete', this.deleteMsg)
    socket.on('update', this.updateMsg)
    this.getRooms()
  }
  joinRoom (e) {
    socket.emit('changeRoom', e.target.innerHTML)
    this.setState({currentRoom: e.target.innerHTML})
  }
  getRooms () {
    socket.emit('getRooms', '')
    socket.on('getRooms', roomsArr => {
      this.setState({rooms: this.state.rooms.concat(roomsArr)})
    })
  }
  handleNewMsg (msg) {
    var index = this.getIndexOfRoom(msg.room)
    if (index >= 0) {
      var newMsgState = this.state.msgsInRoom
      newMsgState[index].messages.push(msg)
      // .messages.concat(msg)
      this.setState({msgsInRoom: newMsgState})
    }
  }
  getIndexOfRoom (searchRoom) {
    return this.state.msgsInRoom.findIndex(obj => obj.room === searchRoom)
  }
  getIndexOfMsg (roomIndex, msgId) {
    return this.state.msgsInRoom[roomIndex].messages.findIndex(obj => obj._id === msgId)
  }
  handleMsgStateUpdates (updateOrDeletestr, updatedMsg) {
    console.log(updatedMsg)
    var roomIndex = this.getIndexOfRoom(updatedMsg.room)
    if (roomIndex >= 0) {
      var msgIndex = this.getIndexOfMsg(roomIndex, updatedMsg._id)
      var newMsgState = this.state.msgsInRoom
      if (updateOrDeletestr === 'delete') {
        newMsgState[roomIndex].messages.splice(msgIndex, 1)
      } else if (updateOrDeletestr === 'update') {
        newMsgState[roomIndex].messages.splice(msgIndex, 1, updatedMsg)
      }
      this.setState({msgsInRoom: newMsgState})
    }
  }
  updateMsg (msg) {
    this.handleMsgStateUpdates('update', msg)
  }
  deleteMsg (msg) {
    return this.handleMsgStateUpdates('delete', msg)
  }

  render () {
    return (
      <div>
        <Rooms joinRoom={this.joinRoom} rooms={this.state.rooms} currentRoom={this.state.currentRoom} />
        <MessageList joinRoom={this.joinRoom} currentRoom={this.state.currentRoom} messages={this.state.msgsInRoom} />
        <WriteMsg />
      </div>
    )
  }
}

export default App
