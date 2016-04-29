/* global socket */
import React from 'react'

class Rooms extends React.Component {
  constructor (props) {
    super()
  }

  mostPopularRoom (props) {
    if (sortedPopRoom.length > 0 ) {
      return <p>Most popular room for the last 300messages is {sortedPopRoom[0].value}</p>
    } else {
      return <p></p>
    }
  }

  render () {
    var sortedPopRoom = this.props.mostPopularRoom
      .reduce((pre, curr) => (pre.value > curr.value) ? [pre] : [curr], [])
      .map(obj => <p>Most popular room for the last 300messages is {obj._id} with {Math.round(obj.value / 300 * 100)}%</p>)
    console.log(sortedPopRoom)
    var rooms = this.props.rooms.map((room, i) => <li key={i} onClick={this.props.joinRoom}>{room}</li>)
    return (
      <nav>
        <ul>
          {rooms}
        </ul>
        {sortedPopRoom}
      </nav>
    )
  }
}

export default Rooms;