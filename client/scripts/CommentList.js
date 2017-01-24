import React from "react";
import axios from "axios";
import Update_Modal from "./ModalUpdate";
import { OverlayTrigger, Row, Grid, Col, Popover, Tooltip, Glyphicon, Button, Modal, ButtonToolbar, Table,Form,FormGroup,FormControl,ControlLabel } from 'react-bootstrap'
import sweetAlert from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css';
require('../css/base.css');

export default class CommentList extends React.Component{
  constructor(props){
      super(props);
  }
  handleSubmit (id) {
    sweetAlert({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      axios.post('/api/delete',{id:id})
      .then((response) => {
        this.props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
  render() {
    //使用者資料
  let user_list = this.props.data.map(items => {
    return(
      <tr key={items.id}>
        <td>{items.id}</td>
        <td><a href={'/profile/'}> {items.name}</a></td>
        <td>{items.text}</td>
        <td>
            <Row >
              <Col xs={6} md={6} >
                <Update_Modal refresh={this.props.refresh} user_data= {{id:items.id, name:items.name, text:items.text}} />
              </Col>
              <Col xs={6} md={6}>
                <Button style={{marginLeft: -50 + 'px'}} onClick={(id) => this.handleSubmit(items.id)} bsStyle="danger">Delete</Button>
              </Col>
            </Row>
        </td>
      </tr>
    )
  });
    return(
    <Table >
      <thead>
        <tr>
        <th>Id</th>
        <th>Author</th>
        <th>comment</th>
        <th>編輯</th>
        </tr>
      </thead>
      <tbody>
      {user_list}
      </tbody>
    </Table>
    );
  }
};