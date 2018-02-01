import * as types from '../actionTypes/index.js';

let initialState = {};

export default function chats(state = initialState, action) {
  switch (action.type) {
    case types.CHATS_NEW_CHAT:
    return [
      ...state,
    ];
    case types.CHATS_NEW_CHAT_SUCCESS:
    return [
      ...state,
      action.payload
    ];
    case types.CHATS_GET_SUCCESS:
    return [
      ...action.payload
    ]
    default:
    break;
  }
  return state
}
