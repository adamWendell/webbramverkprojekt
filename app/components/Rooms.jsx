/* global socket */
import React from 'react'

class Rooms extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var sortedPopRoom = this.props.mostPopularRoom
      .reduce((pre, curr) => (pre[0].value > curr.value) ? pre : [curr], [{value: 0}])
      .map((obj, i) => <p key={i+'mo'}>Most popular room for the last 300messages is {obj._id} with {Math.round(obj.value / 300 * 100)}% </p>)
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