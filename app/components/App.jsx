import React from 'react'
import MessageList from './MessageList.jsx'
import Rooms from './Rooms.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: [],
      currentRoom: 'general',
      MsgsInRoom: []
    }
    this.getRooms = this.getRooms.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }
  componentWillMount () {
    socket.emit('changeRoom', this.state.currentRoom)
    socket.on('chat', msg => this.setState({messages: this.state.messages.concat(msg.msg)}))
    socket.on('fetchMsgs', (x) => {
      var newMsgState = x
        .reduce((state, newMsg) => { return state.concat(newMsg) }, [])
      this.setState({messages: newMsgState})
    })
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



  render () {
    return (
      <div>
        <Rooms joinRoom={this.joinRoom} rooms={this.state.rooms} currentRoom={this.state.currentRoom} logger={this.logger} />
        <MessageList joinRoom={this.joinRoom} />
      </div>
    )
  }
}

export default App
