import React from "react";
import axios from "axios";
import { OverlayTrigger, Row, Grid, Col, Popover, Tooltip, Glyphicon, Button, Modal, ButtonToolbar, Table,Form,FormGroup,FormControl,ControlLabel } from 'react-bootstrap'
import sweetAlert from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css';
require('../css/base.css');
export default class CommentForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        author: '',
        text: ''
      };
  }
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }
  handleTextChange(e){
    this.setState({text: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var user_data = {'author':author,'text':text};
    if (!text || !author) {
      return;
    }
    axios.post(this.props.url,{data:user_data})
      .then((response) => {
      })
      .catch((err) => {
        console.log(err);
    });
      setTimeout(() =>{
        console.log("submit");
        this.props.refresh();
      },100);
    this.setState({author: '', text: ''});
  }
  render(){
    return (
       <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name:</ControlLabel>
            {' '}
            <FormControl type="text" value={this.state.author} onChange={this.handleAuthorChange.bind(this)} placeholder="Your name" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineText">
            <ControlLabel>Comment:</ControlLabel>
            {' '}
            <FormControl type="text" value={this.state.text} onChange={this.handleTextChange.bind(this)} placeholder="Say something..." />
          </FormGroup>
          {' '}
          <Button type="submit" value="Post">
            <Glyphicon glyph="hand-up" /> Send
          </Button>
      </Form>
    );
  }
};