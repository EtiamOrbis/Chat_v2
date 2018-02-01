import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { connect } from 'react-redux';

import * as types from '../actionTypes/index.js';
import { getHeaders } from '../utils/http';

class Facebook extends React.Component{
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook (response) {
    localStorage.setItem('token', response.accessToken);
    const payload = {
      accessToken: response.accessToken,
      name: response.first_name,
      email: response.email,
      avatar: response.picture.data.url,
      social: 'facebook',
      socialId: response.id
    }
    const myInit = {
      authMethod: 'facebook',
      method: 'post',
      body: JSON.stringify(payload),
      headers: getHeaders()
    }
    this.props.newUser(myInit);
  }
  render () {
    return (
      <div>
        <FacebookLogin
          socialId="1498660970170391"
          language="en_US"
          scope="public_profile,email,user_photos"
          responseHandler={this.responseFacebook}
          xfbml={true}
          fields="id,email,first_name,picture.type(large)"
          version="v2.10"
          className="facebook-login"
          buttonText="
          Continue with Facebook
          "
        />
      </div>
    );
  }
}
export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    newUser: (init) => {
      const newUserData = () => {
        return dispatch => {
          dispatch({type: types.USER_REQUEST, init});
          dispatch({type: types.CHATS_GET});
        }
      }
      dispatch(newUserData());
    }
  })
)(Facebook);
