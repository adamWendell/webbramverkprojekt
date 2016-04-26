import React from 'react'

class WriteMsg extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    socket.emit('chat', {
      message: this.refs.message.value,
      author: this.refs.author.value
    });
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref='author' placeholder='author'></input>
        <br />
        <textarea ref='message'></textarea>
        <br />
        <button>Send</button>
      </form>
    )
  }
}

export default WriteMsg;