import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserJoined from '../components/userJoined';

class JoinAlert extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.chat);
  }
  componentDidUpdate() {
    console.log(this.props.chat.newMember);
  }
  render() {
    console.log('render');
    return (
      <div>
      {this.props.chat.newMember._id ? <div key={this.props.chat.newMember._id} className='joinde-member'>{this.props.chat.newMember.name} just joined</div> : <div className='joinde-member'></div>}
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
)(JoinAlert);
