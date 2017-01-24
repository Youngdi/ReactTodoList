import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  author: '',
  text: '',
};

export default function TodoReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTHOR_HANDLE:
      {
        return { ...state, author: action.payload };
      }
    case ActionTypes.TEXT_HANDLE:
      {
        return { ...state, text: action.payload };
      }
    case ActionTypes.CLEAR_HANDLE:
      {
        return { ...state, text: action.payload.text, author: action.payload.author };
      }
    default:
  }
  return state;
}
