import React from 'react'
import Message from './Message.jsx'

class MessageList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var messageNodes = this.props.messages.map((message, i) => {
      console.log(message)
      return (
        <Message key={i} message={message} />
      )
    })

    return (
      <div> {messageNodes} </div>
    )
  }
}

export default MessageList
