import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentBox from '../components/CommentBox';
// import { getTodoList, deleteTodo, addTodo } from '../actions/todosAction';
import * as Todos from '../actions/todosAction';
// import {setAuthor , setText, clearInput } from '../actions/todoAction';
import * as Todo from '../actions/todoAction';

// 專案目前寫法，用兩個function傳入要渲染的component，並用bindActionCreators一次把所有要用到的actions包起來
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      todos: bindActionCreators(Todos, dispatch),
      todo: bindActionCreators(Todo, dispatch),
    },
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
/* ES7 寫法，這個寫法也不錯，store傳進來會連dispatch一起傳進來，可以讓component直接呼叫dispatch(action來用)
@connect((store) => {
    return {
        todo: store.todo
    };
})*/
/* 舊得用法，容易搞混，還要一個一個定義，麻煩
export default connect(
    (state) => ({
        todos: state.todos,
        todo: state.todo,
    }),
    (dispatch) => ({
        loadCommentsFromServer: () => (
            dispatch(getTodoList())
        ),
        deleteTodoSubmit: (id) => (
            dispatch(deleteTodo(id))
        ),
        updateTodoSubmit: (userData) => (
            dispatch(updateTodo(userData))
        ),
        authorChange: (author) =>(
          dispatch(setAuthor(author))
        ),
        textChange:(text) =>(
          dispatch(setText(text))
        ),
        clearInput:() =>(
          dispatch(clearInput())
        ),
        addTodo:(user_data) =>(
          dispatch(addTodo(user_data))
        ),
    })
)(CommentBox);*/
