import * as types from '../actionTypes/index.js';

let initialState = {
  authorized: false,
  loading: false,
};


export default function chat(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_CONNECT:
    return {
      ...state,
      loading:true
    }
    case types.CHAT_CONNECT_SUCCESS:
    const chatData = action.payload;
    return {
      ...state,
      ...chatData,
      authorized: true,
      loading:false
    }
    case types.CHAT_NEW_MESSAGE_SUCCESS:
    return {
      ...state,
      chatMessages: [...state.chatMessages, action.payload],
      authorized: true,
      loading:false
    }
    case types.CHAT_GET_MEMBERS_SUCCESS:
    return {
      ...state,
      members: action.payload,
      authorized: true,
      loading:false
    }
    default:
    break;
  }
  return state
}
