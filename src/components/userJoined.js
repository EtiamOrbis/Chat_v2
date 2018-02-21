import { store } from '../index';

let UserJoined = (function () {
  let joinedUser = {}

  function getUser(user) {
      let state = store.getState();
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
    let state = store.getState();
    state.chat.newMember = {};
  }

  function alertUser() {
      let state = store.getState();
        if (joinedUser._id) {
          setTimeout(function() {UserJoined.removeAlert()}, 500);
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
