import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
    }
  }
  componentDidMount() {
    let userData = JSON.parse(localStorage.state);
    this.setState({
      user: userData.user._id
    })
  }
  componentWillUpdate() {
    setTimeout(function() {
      let block = document.getElementById('block');
      block.scrollTop = block.scrollHeight;
    }, 100);
  }
  render() {
    return (
      <div id='block' className="messages">
      <div className='block-messages'>
        {this.props.chat.chatMessages.map((message) => {
            return (
                <div key={message._id} className={message.author._id === this.state.user ? 'this-user-message-inwards' : 'another-user-message-inwards'}>
                  <div className={message.author._id === this.state.user ? 'author-data' : 'not-author-data'}>
                    <div className='no-img'>{message.author.avatar ? '' : message.author.name[0]}</div>
                    <img className="rounded-left avatar-img-mini" src={message.author.avatar ? 'http://localhost:8000/static/' + message.author.avatar : 'http://localhost:8000/static/blue.png'} alt="not found"></img>
                    { message.author.name}
                  </div>
                  <div className='alert alert-light'>{message.text}</div>
                </div>
            )
        }
        )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  dispatch => ({})
)(Messages);
