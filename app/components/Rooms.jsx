import React, { PropTypes } from 'react'

class Rooms extends React.Component {
  constructor (props) {
    super()
    this.state = {
      rooms:[]
    }
  }
  getRooms(){
    socket.emit('getRooms', '')
    socket.on('getRooms', roomsArr => {
      this.setState({rooms: this.state.rooms.concat(roomsArr))
    })
  }
  render () {
    <nav>
      <ul>

      </ul>
    </nav>
  }
}

export default Rooms;