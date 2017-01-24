import React, { PropTypes } from 'react';
import { Glyphicon, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import * as todosAction from '../actions/todosAction';
import * as todoAction from '../actions/todoAction';

class CommentForm extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: '',
    };
  }
  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
    this.context.dispatch(todoAction.setAuthor(e.target.value));
    // 改成直接套context下的dispatch
    // this.props.authorChange(e.target.value);
    // this.props.dispatch(setAuthor(e.target.value));
  }
  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
    this.context.dispatch(todoAction.setText(e.target.value));
    // 改成直接套context下的dispatch
    // this.props.textChange(e.target.value);
    // this.props.dispatch(setText(e.target.value));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    // var user_data = {'author':author,'text':text};
    if (!text || !author) {
      return;
    }
    const { todo } = this.props;
    if (!todo.author || !todo.text) {
      return;
    }
    const userData = { author: todo.author, text: todo.text };
    this.context.dispatch(todoAction.clearInput());
    // this.props.clearInput();
    // 改成直接套context下的dispatch
    this.context.dispatch(todosAction.addTodo(userData));
    // this.props.addTodo(userData);
    // 改成直接套context下的dispatch
    this.setState({ author: '', text: '' });
  }
  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name:</ControlLabel>
          {' '}
          <FormControl type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="Your name" />
        </FormGroup>
        {' '}
        <FormGroup controlId="formInlineText">
          <ControlLabel>Comment:</ControlLabel>
          {' '}
          <FormControl type="text" value={this.state.text} onChange={this.handleTextChange} placeholder="Say something..." />
        </FormGroup>
        {' '}
        <Button type="submit" value="Post">
          <Glyphicon glyph="hand-up" /> Send
        </Button>
      </Form>
    );
  }
}
export default CommentForm;
