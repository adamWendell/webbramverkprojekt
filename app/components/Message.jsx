import React, { PropTypes } from 'react'

const Message = (props) => {
  return (
    <div>{props.message.message}</div>
  )
}

export default Message;