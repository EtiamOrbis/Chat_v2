import React, { Component } from 'react';

import ChatData from './components/chatData';
import Messages from './components/messages';
import NewMessage from './components/newMessage';
import JoinAlert from './components/joinAlert';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false
    }
  }
  componentDidMount() {
    setTimeout(function() {
      this.setState({
        isLoad:true
      })
    }.bind(this), 100);
  }

  render() {
    return (
      <div className="App">
        <div className="chat-room">
        <div >
          {this.state.isLoad ? <JoinAlert /> : ''}
        </div>
          <div >
            {this.state.isLoad ? <ChatData /> : ''}
          </div>
          <div className='chat-messages'>
            {this.state.isLoad ? <Messages /> : ''}
            </div>
          <NewMessage />
        </div>
      </div>
    );
  }
}

export default ChatRoom
