import React, { PropTypes } from 'react'

class Message extends React.Component {
  constructor (props) {
    super(props)
    this.updateMessage = this.updateMessage.bind(this)
  }
  updateMessage () {
    socket.emit('update',  this.props.message)
  }
  render () {
  var message = this.props.message
    return (
      <div>
        <p>{message.author}</p>
        <p>{message.message}</p>
        <button onClick={this.updateMessage}>update</button>
        <hr />
        </div>
    )
  }
}

export default Message

