import React from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { OverlayTrigger, Row, Grid, Col, Popover, Tooltip, Glyphicon, Button, Modal, ButtonToolbar, Table,Form,FormGroup,FormControl,ControlLabel } from 'react-bootstrap'
import sweetAlert from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css';
require('../css/base.css');
//ES6 syntax class XXX extends React.Component 有constructor
export default class CommentBox extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        data: []
      };
  }
  componentDidMount(){
      this.loadCommentsFromServer();
      // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  loadCommentsFromServer(){
    axios.get('/api/comments')
      .then((response) => {
        console.log(response.data.user_data);
        // this.state.data = response.data.user_data;
        this.setState({data: response.data.user_data});
      })
      .catch((err) => {
        console.log(err)
      });
  }
  render(){
    return (
      <div>
        <h1>Comments box practice: add, delete, update, search</h1>
        <hr/>
        <h2>Using: React, ReactDom, React-bootstrap, express, mongoDB, webpack</h2>
        <hr/>
        <h3>Tips: Button event, componentLifeCycle, map function, component can cross using one anothers method, just remember pass the props.</h3>
        <hr/>
        <CommentList refresh={this.loadCommentsFromServer.bind(this)} data={this.state.data} />
        <CommentForm refresh={this.loadCommentsFromServer.bind(this)} url="/api/comments" />
      </div>
    );    
  }
};
