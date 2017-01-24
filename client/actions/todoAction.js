import * as ActionTypes from '../constants/ActionTypes';

export function setAuthor(name) {
  return {
    type: ActionTypes.AUTHOR_HANDLE,
    payload: name,
  };
}
export function setText(text) {
  return {
    type: ActionTypes.TEXT_HANDLE,
    payload: text,
  };
}
export function clearInput() {
  return {
    type: ActionTypes.CLEAR_HANDLE,
    payload: { text: ' ', author: ' ' },
  };
}
