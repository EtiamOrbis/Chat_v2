import nav from '../services/nav';
import { options } from '../utils/http';
import { Singleton } from '../services/singleton';
import * as types from '../actionTypes/index.js';
var io = {};

const chatMiddleware = store => next => action => {
  switch(action.type) {
    case types.USER_REQUEST:
      fetch('http://localhost:8000/api/v1/auth/' + action.init.authMethod, action.init)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          io = Singleton.init();
          Singleton.getInstance();
          nav('user');
          store.dispatch({type: types.USER_AUTH_SUCCESS, payload: response.primary});
        } else {
          alert(response.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    break;
    case types.CHATS_GET:
      fetch('http://localhost:8000/api/v1/chats', options('get'))
      .then(responseToAllChat => responseToAllChat.json())
      .then(responseToAllChat => {
        store.dispatch({type: types.CHATS_GET_SUCCESS, payload: responseToAllChat});
      }).catch((error) => {
        console.log(error);
      });
    break;
    case types.USER_CHATS:
    fetch('http://localhost:8000/api/v1/me/chats', options('get'))
    .then(responseToMyChats => responseToMyChats.json())
    .then(responseToMyChats => responseToMyChats.map((chat) => chat._id))
    .then(responseToMyChats => {
      store.dispatch({type: types.USER_CHATS_SUCCESS, payload: responseToMyChats});
    }).catch((error) => {
      console.log(error);
    });
      break;
    case types.CHATS_NEW_CHAT:
      fetch('http://localhost:8000/api/v1/chats', action.payload)
      .then(responseToNewChat => responseToNewChat.json())
      .then(responseToNewChat => {
        store.dispatch({type: types.CHATS_NEW_CHAT_SUCCESS, payload: responseToNewChat});
        const id = responseToNewChat._id;
        const payload = options('get');
        store.dispatch({type: types.USER_CHATS});
        store.dispatch({type: types.CHAT_CONNECT, payload: {...payload, id}});
      }).catch((error) => {
        console.log(error);
      });
    break;
    case types.CHAT_CONNECT:
      fetch('http://localhost:8000/api/v1/chats/' + action.payload.id, action.payload)
      .then(responseToChat => responseToChat.json())
      .then(responseToChat => {
        console.log(responseToChat);
        fetch('http://localhost:8000/api/v1/chats/' + action.payload.id + '/messages' , action.payload)
        .then(responseToMessages => responseToMessages.json())
        .then(responseToMessages => {
          const allChatData = {
            ...responseToChat,
            chatMessages: [...responseToMessages],
            chatMembers: responseToChat.members,
            newMember: {}
          }
          function sortMessages(a, b) {
            if (a.createdAt > b.createdAt) return 1;
            if (a.createdAt < b.createdAt) return -1;
          }
          allChatData.chatMessages.sort(sortMessages);
          nav('chat');
          store.dispatch({type: types.CHAT_CONNECT_SUCCESS, payload: allChatData});
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    break;
    case types.SUBSCRIBE:
      fetch('http://localhost:8000/api/v1/me/chats/' + action.payload.id, action.payload)
      .then(responseToSubscribe => responseToSubscribe.json())
      .then(responseToSubscribe => {
        if (!io.connected) {
          io = Singleton.init();
        }
        Singleton.emit('join', { type: 'chat', id: action.payload.id});
        store.dispatch({type: types.USER_CHATS});
        store.dispatch({type: types.CHAT_GET_MEMBERS, payload:action.payload})
      }).catch((error) => {
        console.log(error);
      });
      break;
    case 'CHAT_NEW_MESSAGE':
      fetch('http://localhost:8000/api/v1/chats/' + action.payload.id + '/messages' , action.payload)
      .then(responseToNewMessage => responseToNewMessage.json())
      .then(responseToNewMessage => {
        store.dispatch({type: types.CHAT_NEW_MESSAGE_SUCCESS, payload: responseToNewMessage});
      }).catch((error) => {
        console.log(error);
      });
    break;
    case types.CHAT_GET_MEMBERS:
    setTimeout(function() {
      fetch('http://localhost:8000/api/v1/chats/' + action.payload.id + '/members', options('get'))
      .then(responseToGetMembers => responseToGetMembers.json())
      .then(responseToGetMembers => {
        store.dispatch({type: types.CHAT_GET_MEMBERS_SUCCESS, payload: responseToGetMembers});
      }).catch((error) => {
        console.log(error);
      });
    }, 100);
    break;
    default:
    break;
  }
  return next(action);
}

export { chatMiddleware };
