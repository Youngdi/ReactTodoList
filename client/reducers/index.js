import { combineReducers } from 'redux';
import todo from './TodoReducer';
import todos from './TodosReducer';

export default combineReducers({
  todo,
  todos,
});

