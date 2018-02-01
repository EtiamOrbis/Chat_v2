import * as types from '../actionTypes/index.js';

let initialState = {
  authorized: false,
  loading: false,
  _id: null
};


export default function users(state = initialState, action) {
  switch (action.type) {
    case types.USER_REQUEST:
    return {
      ...state,
      loading:true
    };
    case types.USER_AUTH_SUCCESS:
    const user = action.payload;
    return {
      ...state,
      ...user,
      authorized: true,
      loading:false,
      _id: action.payload._id
    }
    case types.USER_CHATS_SUCCESS:
    state.chats = action.payload;
    return {
      ...state,
    }
    default:
    break;
  }
  return state
}
