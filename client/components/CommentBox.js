import React, { PropTypes } from 'react';
import { Link, routerShape } from 'react-router';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

// require('../css/base.scss');
// import '../css/base.scss';

class CommentBox extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    todos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    actions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    dispatch: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  static contextTypes = {
    router: routerShape.isRequired,
  };

  static childContextTypes = {
    chatClient: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
    };
  }
  getChildContext() {
    return {
      dispatch: this.props.dispatch,
    };
  }
  componentWillMount() {
    this.props.actions.todos.getTodoList();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.enable !== this.props.enable)
  //   nextState.enable = true;
  //   return true;
  // }
  render() {
    console.log(this.props);
    console.log(this.props.actions);
    const { todo, todos } = this.props;
    const { setAuthor, setText, clearInput } = this.props.actions.todo;
    const { deleteTodo, updateTodo, addTodo } = this.props.actions.todos;
    const user = { id: '123' };
    return (
      <div>
        <div className="ABC">
          <h1>Todo list practice: add, delete, update, search</h1>
        </div>
        <div className="ABC">
          <h2>Using: React, ReactDom, React-Redux, React-Router, React-bootstrap, sweetAlert2, express, mongoDB, webpack, webpackHotReload</h2>
        </div>
        <div className="AAA">
          <h3>Tips: Button event, componentLifeCycle, map function, component can cross using one anothers method, just remember pass the props.</h3>
        </div>
        <h4><Link to={'/video'}>Video</Link></h4>
        <h4><Link to={`/users/${user.id}`}>Users</Link></h4>
        <div className="BBB">
          <div className="icon-editor-calender" />
          <p>123</p>
          <div className="icon-editor-calender" />
          <div className="icon-editor-_close_pressed"><a href="#">{1}</a></div>
        </div>

        <CommentForm
          todo={todo}
          authorChange={setAuthor}
          textChange={setText}
          clearInput={clearInput}
          addTodo={addTodo}
        />
        <CommentList
          todos={todos}
          deleteTodoHandle={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    );
  }
}
export default CommentBox;
