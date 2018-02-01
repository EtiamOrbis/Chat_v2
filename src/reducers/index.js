import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import chat from './chat';
import chats from './chats';

export default combineReducers({
  user,
  chat,
  chats,
  router: routerReducer
})
