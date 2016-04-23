/* global socket */
import React from 'react'

class Rooms extends React.Component {
  constructor (props) {
    super()
    this.state = {
      rooms: []
    }
  }



  render () {
    var rooms = this.props.rooms.map(room => <li onClick={this.props.joinRoom}>{room}</li>)
    return (
      <nav>
        <ul>
          {rooms}
        </ul>
      </nav>
    )
  }
}

export default Rooms;