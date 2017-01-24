import axios from 'axios';
import swal from 'sweetalert2';
import * as ActionTypes from '../constants/ActionTypes';
// import 'sweetalert2/dist/sweetalert2.css';

export function getTodoList() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_TODO_LIST });
    axios.get('/api/comments')
        .then((response) => {
          dispatch({ type: ActionTypes.GET_TODO_LIST_FULFILLED, payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: ActionTypes.GET_TODO_LIST_REJECTED, payload: err });
        });
  };
}
export function deleteTodo(userId) {
  return (dispatch) => {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(() => {
      dispatch({ type: ActionTypes.DELETE_TODO });
      axios.post('/api/delete', { id: userId })
          .then(() => {
            dispatch({ type: ActionTypes.DELETE_TODO_FULFILLED });
            //  呼叫getTodoList跨function的記得使用dispatch去呼叫到裡面的return function(dispatch)
            dispatch(getTodoList());
          })
          .catch((err) => {
            dispatch({ type: ActionTypes.DELETE_TODO_REJECTED, payload: err });
          });
    }).catch(swal.noop);
// If rejections are not handled, it will be logged as an error.
// To avoid this, add a rejection handler to the Promise.
// Alternatively, you can use .catch(swal.noop) as a quick way to simply suppress the errors:
  };
}
export function updateTodo(userData) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_TODO });
    axios.post('/api/update', { data: userData })
      .then(() => {
        dispatch({ type: ActionTypes.UPDATE_TODO_FULFILLED, payload: userData });
        //  呼叫getTodoList跨function的記得使用dispatch去呼叫到裡面的return function(dispatch)
        dispatch(getTodoList());
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.UPDATE_TODO_REJECTED, payload: err });
      });
  };
}
export function addTodo(userData) {
  // 全形字自動轉半形
  function fullToHalf(val) {
    const value = val || '';
    let result = '';
    if (value) {
      for (let i = 0; i <= value.length; i += 1) {
        if (value.charCodeAt(i) === 12288) {
          result += ' ';
        } else {
          if (value.charCodeAt(i) > 65280 && value.charCodeAt(i) < 65375) {
            result += String.fromCharCode(value.charCodeAt(i) - 65248);
          } else {
            result += String.fromCharCode(value.charCodeAt(i));
          }
        }
      }
    }
    return result.slice(0, value.length);
  }
  const authorCheck = fullToHalf(userData.author);
  const textCheck = fullToHalf(userData.text);
  const userDataCheck = {
    author: authorCheck,
    text: textCheck,
  };
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_TODO });
    axios.post('/api/comments', { data: userDataCheck })
        .then(() => {
          dispatch({ type: ActionTypes.ADD_TODO_FULFILLED });
          //  呼叫getTodoList跨function的記得使用dispatch去呼叫到裡面的return function(dispatch)
          dispatch(getTodoList());
        })
        .catch((err) => {
          dispatch({ type: ActionTypes.ADD_TODO_REJECTED, payload: err });
        });
  };
}
