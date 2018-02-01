import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../actionTypes/index.js';
import { options } from '../utils/http';

class Chats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    }
    this.connectToChat = this.connectToChat.bind(this);
  }

  connectToChat(id) {
    this.props.connectToChat(options('get'), id)
  }

  render() {
    return (
      <div className="chats">
      {this.props.chats.map((chat) => {
        return (
          <div className="card" style={{width: 100 + "%"}} key={chat._id} id={chat._id}>
            <div className="card-body">
              <h4 className="card-title">{chat.name}</h4>
              <p className="card-text">{chat.description}</p>
              <button className="btn btn-primary" style={this.state.width > 500 ? {width: 300 + "px"} : {width: 100 + "%"}}
              onClick={() => this.connectToChat(chat._id)}>Join</button>
            </div>
          </div>
        )
      })}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat,
    chats: state.chats
  }),
  dispatch => ({
    connectToChat: (options, id) => {
      const chat = () => {
        return dispatch => {
          dispatch({type: types.CHAT_CONNECT, payload:{...options, id}})
        }
      }
      dispatch(chat())
    }
  })
)(Chats);
