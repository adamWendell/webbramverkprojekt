import React, { PropTypes } from 'react'

class Message extends React.Component {
  constructor (props) {
    super(props)

    this.updateMessage = this.updateMessage.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
  }
  deleteMessage () {
    console.log(this.props.message);
    socket.emit('delete',  this.props.message)
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
        <button onClick={this.deleteMessage}>delete</button>
        <hr />
        </div>
    )
  }
}

export default Message

