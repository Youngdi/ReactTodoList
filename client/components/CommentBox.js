import React, { PropTypes } from 'react';
import { Link, routerShape } from 'react-router';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import * as todosAction from '../actions/todosAction';
// require('../css/base.scss');
// import '../css/base.scss';

class CommentBox extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    todos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    dispatch: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
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
    this.props.dispatch(todosAction.getTodoList());
    // this.props.actions.todos.getTodoList();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.enable !== this.props.enable)
  //   nextState.enable = true;
  //   return true;
  // }
  render() {
    const { todo, todos } = this.props;
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
        <h4><Link to={'/canvas'}>Canvas</Link></h4>
        <h4><Link to={`/users/${user.id}`}>Users</Link></h4>
        <div className="CCC">Hello</div>
        <div className="BBB">
          <div className="icon-editor-calender" />
          <p>123</p>
          <div className="icon-editor-calender" />
          <div className="icon-editor-_close_pressed"><a href="#">{1}</a></div>
        </div>

        <CommentForm
          todo={todo}
        />
        <CommentList
          todos={todos}
        />
      </div>
    );
  }
}
export default CommentBox;
