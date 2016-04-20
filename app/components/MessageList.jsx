import React from 'react'
import Message from './Message.jsx'

class MessageList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.joinRoom = this.joinRoom.bind(this)
  }
  componentWillMount () {
    this.joinRoom('general')
    socket.on('chat', msg => this.setState({messages: this.state.messages.concat(msg.msg)}))
  }
  joinRoom (room) {
    socket.emit('changeRoom', room)
    socket.on('fetchMsgs', (x) => {
      var newMsgState = x
        .reduce((state, newMsg) => { return state.concat(newMsg) }, this.state.messages)
      this.setState({messages: newMsgState})
    })
  }
  render () {
    var messageNodes = this.state.messages.map((message, i) => {
      return (
        <Message key={i}message={message} />
      )
    })

    return (
      <div> {messageNodes} </div>
    )
  }
}

export default MessageList
