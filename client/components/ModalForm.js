import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
import { Glyphicon, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { updateTodo } from '../actions/todosAction';

// @connect(store => store)

class ModalForm extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    close: PropTypes.func.isRequired,
  };
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      author: props.userData.name,
      text: props.userData.text,
      id: props.userData.id,
    };
    console.log(this.context);
  }
  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }
  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const author1 = this.state.author.trim();
    const text1 = this.state.text.trim();
    const id1 = this.state.id;
    const userData = { author: author1, text: text1, id: id1 };
    if (!text1 || !author1 || !id1) return null;
    this.context.dispatch(updateTodo(userData));
    // this.props.updateTodo(userData);
    setTimeout(() => {
      this.props.close();
    }, 100);
    this.setState({ author: '', text: '' });
    return null;
  }
  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineName">
          <ControlLabel> Name: </ControlLabel> { ' ' }
          <FormControl
            type="text"
            value={this.state.author}
            onChange={this.handleAuthorChange}
            placeholder="Your name"
          />
        </FormGroup>
        { ' ' }
        <FormGroup controlId="formInlineText">
          <ControlLabel> Comment: </ControlLabel>
          { ' ' }
          <FormControl
            type="text"
            value={this.state.text}
            onChange={this.handleTextChange}
            placeholder="Say something..."
          />
        </FormGroup>
        { ' ' }
        <Button type="submit" value="Post">
          <Glyphicon glyph="hand-up" /> Send
        </Button>
      </Form>
    );
  }
}

export default ModalForm;
