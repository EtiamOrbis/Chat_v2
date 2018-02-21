import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../actionTypes/index.js';
import { getHeaders } from '../utils/http';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signUp: false
    }
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.submitUserData = this.submitUserData.bind(this);
    this.regForm = this.regForm.bind(this);
  }

  componentWillMount() {
    this.width = window.innerWidth;
  }

  changeName(event) {
    this.setState({
      name: event.target.value,
    })
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    })
  }

  changeAvatar(event) {
    this.setState({
      avatar: event.target.value,
    })
  }

  submitUserData() {
    const payload = {
      name: this.state.name,
      avatar: this.state.avatar,
      email: this.state.email
    }

    const myInit = {
      authMethod: 'base',
      method: 'post',
      body: JSON.stringify(payload),
      headers: getHeaders()
    }
    if (this.state.name && this.state.email) {
      this.props.newUser(myInit);
    }
  }
  regForm() {
    this.setState({
      signUp: !this.state.signUp
    })
  }
  getBack() {
    this.setState({
      signUp: false
    })
  }
  render () {
    let regForm
    if (this.state.signUp) {
      regForm = <div className="forms">
                    <div className={this.width > 500 ? 'max-form' : 'min-form'}>
                      <input type="text" className='form-control' placeholder="Enter your name" onChange={this.changeName} ref={(input => { this.inputName = input })}></input>
                      <input type="text" className='form-control' placeholder="Enter your email" onChange={this.changeEmail} ref={(input => { this.inputEmail = input })}></input>
                      <input type="text" className='form-control' placeholder="Enter your avatar url (not necessary)" onChange={this.changeAvatar} ref={(input => { this.inputAvatar = input })}></input>
                      <button type="button" style={{width: '50%'}} className="btn btn-success" onClick={this.submitUserData.bind(this)}>Continue</button>
                      <button type="button" style={{width: '50%'}} className="btn btn-info" onClick={this.getBack.bind(this)}>Cancel</button>
                    </div>
                </div>
    }
    return (
        <div>
          <button type="button" style={{width: 300 + 'px'}} className=" btn btn-primary"  onClick={() => this.regForm()}>Sing up</button>
          {regForm}
        </div>
    )
  }
}
export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    newUser: (myInit) => {
      const init = myInit
      const newUserData = () => {
        return dispatch => {
          dispatch({type: types.USER_REQUEST, init});
          dispatch({type: types.CHATS_GET});
        }
      }
      dispatch(newUserData())
    }
  })
)(Auth);
