import React, { Component } from 'react';


import nav from './services/nav';
import Facebook from './services/facebook';
import Auth from './components/auth';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      style:{
        padding: '8px',
        textAlign: 'center'
      }
    }
  }
  componentWillMount() {
    setTimeout(function() {
      const token = localStorage.getItem('token');
      if (token) {
        nav('user');
      }
    }, 100);
  }
  render() {
    return (
      <div className="App">
        <div className="authorization-method">
          <div><Facebook/></div>
          <div style={this.state.style}>or</div>
          <div><Auth/></div>
        </div>
      </div>
    );
  }
}

export default SignUp
