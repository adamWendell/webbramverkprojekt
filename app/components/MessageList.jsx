import React from 'react'
import Message from './Message.jsx'

class MessageList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var messagesNodeList = this.props.messages
      .filter(roomsWithMsgsObj => {
        return roomsWithMsgsObj.room === this.props.currentRoom
      })
      .map(x => x.messages
        .map((x, i) => <Message key={i} message={x} />)
      )

    return (
      <div> {messagesNodeList} </div>
    )
  }
}

export default MessageList
