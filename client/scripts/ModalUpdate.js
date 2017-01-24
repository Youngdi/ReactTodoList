import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ModalForm from "./ModalForm";
import { OverlayTrigger, Row, Grid, Col, Popover, Tooltip, Glyphicon, Button, Modal, ButtonToolbar, Table,Form,FormGroup,FormControl,ControlLabel } from 'react-bootstrap'
import sweetAlert from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css';
require('../css/base.css');

export default class Update_Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return (
      <div>
        <Button bsStyle="primary" onClick={this.open}>Update</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
            <hr />
            <ModalForm refresh={this.props.refresh} close={this.close} user_data={this.props.user_data}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};