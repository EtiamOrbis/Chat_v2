import React, { Component } from 'react';
import { connect } from 'react-redux';

import nav from '../services/nav';
import * as types from '../actionTypes/index.js';

class UserData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      isSignOut:false
    }
    this.signout = this.signout.bind(this);
    this.exit = this.exit.bind(this);
  }

  componentDidMount() {
    setTimeout(function() {
      this.props.getAllCHats();
      this.setState({
        isLoad:true
      })
    }.bind(this), 100);
  }

  signout() {
    this.setState({
      isSignOut:!this.state.isSignOut
    })
  }

  exit() {
    localStorage.clear();
      nav('');
  }

  render() {
    let userData;
    let signOut;
    if (this.state.isSignOut) {
      signOut = <div className='names signout' onMouseLeave={() => this.signout()} onClick={() => this.exit()}>Sign out</div>;
    }
    if (this.state.isLoad) {
      userData = <div >
                  <div className="name" onClick={() => this.signout()}>{ this.props.user.name }</div>
                  { signOut }
                    <div className="user-avatar">
                      <img className="avatar-img" src={'http://localhost:8000/static/'+this.props.user.avatar} alt="img not found"></img>
                    </div>
                 </div>
    }
    return (
      <div className="user-data">
      { userData }
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
    getAllCHats: () => {
        const chats = () => {
          return dispatch => {
            dispatch({type: types.CHATS_GET});
          }
        }
        dispatch(chats())
      }
    })
)(UserData);
