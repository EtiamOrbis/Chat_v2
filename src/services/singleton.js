import io from 'socket.io-client';

import * as types from '../actionTypes/index.js';
import * as socketEvents from '../actionTypes/socket';

import UserJoined from '../components/userJoined';

import { store } from '../index';

var Events = (function () {

  function onNewMessage(data) {
    let state = JSON.parse(localStorage.state);
    if (state.user._id !== data.item.author._id) {
      return store.dispatch({type: types.CHAT_NEW_MESSAGE_SUCCESS, payload:data.item});
    }
  }
  function onNewChatUser(data) {
      return (store.dispatch({type: types.CHAT_GET_MEMBERS, payload:data}), UserJoined.getNewUser(data));
  }
  function onUserLeave(data) {
      return 
  }

    return {
        [socketEvents.CHAT_NEW_MESSAGE]: onNewMessage,
        [socketEvents.CHAT_USER_JOIN]: onNewChatUser,
        [socketEvents.CHAT_USER_LEAVE]: onUserLeave
    };
})();

var Singleton = (function () {
    var instance;
    var listeners;

    listeners = Object.assign({}, Events);

    function createInstance() {
        var object = Object.create("I am the instance");
        return object;
    }

    return {
      init: function () {

          console.log('[SOCKET] INIT');

          const token = localStorage.getItem('token');

          if (!token) {
              return setTimeout(this.init, 300);
          }

          instance = io.connect('http://localhost:8001', {
              query: 'token=' + token
          })

          instance.once('connect', () => {
              console.log('[SOCKET] CONNECT');
              this.initListeners();
          })
          return instance;
      },
      initListeners() {
          console.log('[SOCKET] INIT LISTENERS');
          Object.keys(listeners).forEach(name => {
            this.on(name, listeners[name])
          });
      },
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        emit (event: string, data?, ack?) {
            console.log(`[SOCKET:EMIT] (${event})`, data);
            instance && instance.emit(event, data, ack)
        },
        on: function(event) {
          instance.on(event, data => {
              console.log(`[SOCKET:ON] (${event})`, data);
              if (event === 'CHAT_NEW_MESSAGE') {
                instance.message = data;
                Events.CHAT_NEW_MESSAGE(data);
              }
              if (event === 'CHAT_USER_JOIN') {
                Events.CHAT_USER_JOIN(data);
              }
              if (event === 'CHAT_USER_LEAVE') {
                Events.CHAT_USER_LEAVE(data);
              }
          })
          return instance;
        },
        off: function(event: string, handler?)  {
          this.instance && this.instance.off(event, handler)
        },
        disconnect: function() {
            instance.removeAllListeners();
            instance.disconnect();
            instance = null;
        }
    };
})();

export { Singleton };
