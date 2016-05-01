import React from 'react'

class Message extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
    this.editHandler = this.editHandler.bind(this)
    this.elementHandler = this.elementHandler.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
  }
  deleteMessage () {
    socket.emit('delete', this.props.message)
  }
  updateMessage () {
    var updatedMsg = this.props.message
    updatedMsg.message = this.refs.update.value
    updatedMsg.edited = true
    console.log(updatedMsg)
    socket.emit('update', updatedMsg)
    this.editHandler()
  }
  editHandler () {
    this.setState({editing: !this.state.editing})
  }

  elementHandler (editing) {
    var message = this.props.message
    if (editing) {
      return <div className='message-container'>
        <div className='message'>
          <p className='author'>{message.author}</p>
          <input className='message-text'ref='update'defaultValue={message.message}></input>
        </div>
        <br />
        <div  className='message-buttons'>
          <button onClick={this.deleteMessage}>delete</button>
          <button onClick={this.updateMessage}>update</button>
        </div>
      </div>
    } else {
      return <div className='message-container'>
        <div className='message'>
          <p className='author'>{message.author}</p>
          <p className='message-text'>{message.message}</p>
        </div>
        <div className='message-buttons'>
        <button onClick={this.deleteMessage}>delete</button>
        <button onClick={this.editHandler}>edit</button>
        </div>
      </div>
    }
  }
  render () {
    return (
      <div >
        {this.elementHandler(this.state.editing)}
      </div>
    )
  }
}

export default Message
