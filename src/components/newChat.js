import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../actionTypes/index.js';
import { options } from '../utils/http';

class NewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newChat: false,
    }
    this.createNewChat = this.createNewChat.bind(this);
    this.closeCreate = this.closeCreate.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.submitChat = this.submitChat.bind(this);
  }

  componentWillMount() {
    this.width = window.innerWidth;
  }

  createNewChat() {
    this.setState({
      newChat: !this.state.newChat
    })
  }

  closeCreate() {
    this.setState({
      newChat: false
    })
  }

  changeName(event) {
    this.setState({
      name: event.target.value,
    })
  }

  changeDescription(event) {
    this.setState({
      description: event.target.value,
    })
  }

  submitChat() {
    const payload = {
      name: this.state.name,
      description: this.state.description
    }
    if (this.state.name) {
      this.props.newChat(options('post'), JSON.stringify(payload));
    } else {
      alert('invalid chat name')
    }
  }

  render() {
    let chatData
    if (this.state.newChat) {
      chatData = <div className="forms">
                        <div className={this.width > 500 ? 'max-form' : 'min-form'}>
                          <input type="text" className='form-control' placeholder="Enter chat name" onChange={this.changeName} ref={(input => { this.inputName = input })}></input>
                          <input type="text" className='form-control' placeholder="Enter description" onChange={this.changeDescription} ref={(input => { this.inputDescription = input })}></input>
                          <button type="button" style={{width: '50%'}} className="btn btn-success" onClick={() => this.submitChat()}>Continue</button>
                          <button type="button" style={{width: '50%'}} className="btn btn-primary" onClick={() => this.closeCreate()}>Cancel</button>
                        </div>
                     </div>
    }
    return (
      <div className="new-chat">
      { chatData }
        <div className='list-group-item list-group-item-success' onClick={() => this.createNewChat()}>Create new chat</div>
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
    newChat: (options, payload) => {
      const chat = () => {
        return dispatch => {
          dispatch({type: types.CHATS_NEW_CHAT, payload:{...options, body:payload}})
        }
      }
      dispatch(chat())
    }
  })
)(NewChat);
