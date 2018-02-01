import React, { Component } from 'react';


import NewChat from './components/newChat';
import UserData from './components/userData';
import Chats from './components/chats';


class UserPage extends Component {
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
    let allChats
    if (this.state.isLoad) {
      allChats = <Chats />
    }
    return (
      <div className="App">
          <div><NewChat /></div>
          <div><UserData /></div>
          <div className='all-chats'>{allChats}</div>
      </div>
    );
  }
}

export default UserPage
