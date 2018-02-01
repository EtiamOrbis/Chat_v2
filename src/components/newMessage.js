import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../actionTypes/index.js';
import { options } from '../utils/http';

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'string',
      isSubscribe: false,
      canSubmit: false
    }
    this.changeText = this.changeText.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  componentWillMount() {
    setTimeout(function() {
        this.props.user.chats.forEach((chat) => {
          if (chat === this.props.chat._id) {
            this.setState({
              isSubscribe: true,
            })
          }
        })
    }.bind(this), 100);
  }
  changeText(event) {
    this.setState({
      text: event.target.value,
      canSubmit:true
    })
  }
  subscribe() {
    const payloadChat = {
      id: this.props.chat._id
    }
    this.props.subscribeToChat(options('post'), this.props.chat._id, JSON.stringify(payloadChat));
    this.setState({
      isSubscribe: true,
    })
  }
  submitMessage() {
    this.inputText.value = '';
    const payloadChat = {
      "text": this.state.text
    }
    if (this.state.canSubmit) {
      this.props.newMessage(options('post'), this.props.chat._id, JSON.stringify(payloadChat));
      this.setState({
        canSubmit: false
      })
    }
  }

  render() {
    let send = <div>
                <input type="text" className='form-control' placeholder="Enter text" onChange={this.changeText} ref={(input => { this.inputText = input })}></input>
                <div className='btn list-group-item list-group-item-info' onClick={() => this.submitMessage()}>Send</div>
               </div>;
    let subscribe = <div className='btn list-group-item list-group-item-success' onClick={() => this.subscribe()}>Subscribe</div>;
    return (
      <div className="new-message">
      { this.state.isSubscribe ? send : subscribe }
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  dispatch => ({
    newMessage: (options, id, payload) => {
      const message = () => {
        return dispatch => {
          dispatch({type: types.CHAT_NEW_MESSAGE, payload:{...options, id:id, body:payload}})
        }
      }
      dispatch(message())
    },
    subscribeToChat: (options, id, payload) => {
      const sub = () => {
        return dispatch => {
          dispatch({type: types.SUBSCRIBE,  payload:{...options, id:id, body:payload}})
        }
      }
      dispatch(sub())
    }
  })
)(NewMessage);
