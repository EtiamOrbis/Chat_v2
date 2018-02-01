import React from 'react';
import { store } from '../index';

let UserJoined = (function () {
  let joinedUser = {}

  function getUser(user) {
      let state = store.getState();
      console.log(state.chat.members);
      console.log(user.userId);
        if (user) {
          for (let value of state.chat.members) {
            if (value._id === user.userId) {
              joinedUser = value;
              UserJoined.alertNewUser();
            }
          }
        }
  }

  function remove() {
    console.log('remove');
    let state = store.getState();
    state.chat.newMember = {};
  }

  function alertUser() {
      let state = store.getState();
      console.log(state.chat.members);
      console.log(joinedUser);
        if (joinedUser._id) {
          console.log(joinedUser);
          setTimeout(function() {UserJoined.removeAlert()}, 1500);
          state.chat.newMember = joinedUser;
        }
  }
    return {
      alertNewUser:alertUser,
      getNewUser:getUser,
      removeAlert:remove,
    };
})();

export default UserJoined;

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
//
// class UserJoined extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       timer:false
//     }
//   }
//   componentDidMount() {
//     console.log('componentDidMount');
//     // this.newMember = this.props.chat.members.length;
//   }
//   componentWillUpdate() {
//     console.log('componentWillUpdate');
//     // if (this.newMember !== this.props.chat.members.length) {
//     //   if (!this.state.timer) {
//     //     console.log('1');
//     //     this.setState({
//     //       timer:true
//     //     })
//     //   }
//     // }
//   }
//   componentDidUpdate() {
//     console.log('componentDidUpdate');
//     // setTimeout(function() {
//     //   if (this.state.timer) {
//     //     console.log('2');
//     //     this.setState({
//     //       timer:false
//     //     })
//     //   }
//     // }.bind(this), 2000);
//   }
//   render() {
//     return (
//       <div>
//
//      </div>
//     );
//   }
// }
//
// export default connect(
//   state => ({
//     chat: state.chat,
//   }),
//   dispatch => ({})
// )(UserJoined);


// let UserJoined = () => {
//   function alertUser () {
//     return (
//       <div className='joinde-member'>s</div>
//     )
//   }
//   return {
//     alertNewUser:alertUser
//   }
// }
