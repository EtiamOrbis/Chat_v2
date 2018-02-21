import React, { Component } from 'react';
import { connect } from 'react-redux';

class JoinAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newJoin: true
    }
    this.removeName = this.removeName.bind(this);
  }
  removeName() {
    this.setState({
      newJoin: !this.state.newJoin
    });
    setTimeout(
      function() {
        if (!this.props.chat.newMember.name && !this.state.newJoin) {
          this.setState({
            newJoin: true
          });
        }}.bind(this), 2000);
      }
  render() {
    let joinedMember;
    if (this.state.newJoin && this.props.chat.newMember.name) {
      joinedMember = <div key={this.props.chat.newMember._id} className='joinde-member'> + {this.props.chat.newMember.name}</div>
    }
    return (
      <div onClick={() => this.removeName()}>
      {this.props.chat.newMember._id ? joinedMember : <div className='joinde-member'></div>}
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
