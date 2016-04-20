import React from 'react'
import MessageList from './MessageList.jsx'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div>
        <MessageList />
      </div>
    )
  }
}

export default App
