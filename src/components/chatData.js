import React, { Component } from 'react';
import { connect } from 'react-redux';

import nav from '../services/nav';
import { Singleton } from '../services/singleton';

class ChatData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribers: false
    }
    this.toMain = this.toMain.bind(this);
    this.checkMembers = this.checkMembers.bind(this);
  }
  componentDidMount() {
    this.time = false;
  }
  componentWillMount() {
    setTimeout(function() {
      for (let value of this.props.user.chats) {
        if (value === this.props.chat._id) {
          Singleton.init();
          Singleton.emit('join', { type: 'chat', id: this.props.chat._id})
        }
      }
    }.bind(this), 100);
  }
  componentWillUnmount() {
    Singleton.emit('leave', { type: 'chat', id: this.props.chat._id});
  }
  toMain() {
    setTimeout(function() {
      const token = localStorage.getItem('token');
      if (token) {
        nav('user');
      }
    }, 100);
  }
  checkMembers() {
    this.setState({
      subscribers: !this.state.subscribers
    })
  }
  render() {
    let subscribers
    if (this.props.chat.members) {
      subscribers = this.props.chat.members.map((member) => {
          return (
             <div key={member._id} className='subscriber'>{member.name}</div>
          )
        })
    }
    return (
      <div>
        <div className="names chat-name">{ this.props.chat.name }
        <div className='subscribers-length' onClick={() => this.checkMembers()} > Subscribers: {this.props.chat.members ? this.props.chat.members.length : 0}
        </div>
        {this.state.subscribers ? <div className='subscribers'onMouseLeave={() => this.checkMembers()} >{ subscribers }</div> : ''}
          <div className="to-main" onClick={() => this.toMain()}>{'<'}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    chat: state.chat,
    user: state.user,
  }),
  dispatch => ({})
)(ChatData);
