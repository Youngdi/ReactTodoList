import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CommentBox from "./CommentBox"
import { OverlayTrigger, Row, Grid, Col, Popover, Tooltip, Glyphicon, Button, Modal, ButtonToolbar, Table,Form,FormGroup,FormControl,ControlLabel } from 'react-bootstrap'
import sweetAlert from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css';
require('../css/base.css');
// const CommentBox = new CommentBox_class();
ReactDOM.render(
  <CommentBox pollInterval={2000} />,
  document.getElementById('content')
);
