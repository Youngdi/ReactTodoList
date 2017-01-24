import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { OverlayTrigger, Row, Grid, Col, Popover, Tooltip, Glyphicon, Button, Modal, ButtonToolbar, Table,Form,FormGroup,FormControl,ControlLabel } from 'react-bootstrap'
import sweetAlert from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css';
require('../css/base.css');

//ES6 syntax class XXX extends React.Component 有constructor
class CommentBox extends React.Component{
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
}
//ES5 syntax => React.createClass 用getInitialState

// let CommentBox = React.createClass({
//   loadCommentsFromServer: function() {
//     axios.get(this.props.url)
//       .then((response) => {
//         console.log(response.data.user_data);
//         this.setState({data: response.data.user_data});
//       })
//       .catch((err) => {
//         console.log(err)
//       });
//   },
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     this.loadCommentsFromServer();
//     // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//   },
//   render: function() {
//     return (
//       <div>
//         <h1>Comments box practice: add, delete, update, search</h1>
//         <hr/>
//         <h2>Using: React, ReactDom, React-bootstrap, express, mongoDB, webpack</h2>
//         <hr/>
//         <h3>Tips: Button event, componentLifeCycle, map function, component can cross using one anothers method, just remember pass the props.</h3>
//         <hr/>
//         <CommentList refresh={this.loadCommentsFromServer} data={this.state.data} />
//         <CommentForm refresh={this.loadCommentsFromServer} url="/api/comments" />
//       </div>
//     );
//   }
// });

class CommentList extends React.Component{
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
}

// let CommentList = React.createClass({
//   handleSubmit: function(id) {
//     // old school trick
//     // let _this = this;
//     // sweetAlert({
//     //   title: 'Are you sure?',
//     //   text: "You won't be able to revert this!",
//     //   type: 'warning',
//     //   showCancelButton: true,
//     //   confirmButtonColor: '#3085d6',
//     //   cancelButtonColor: '#d33',
//     //   confirmButtonText: 'Yes, delete it!'
//     // }).then(function() {
//     //   axios.post('/api/delete',{id:id})
//     //   .then((response) => {
//     //     _this.props.refresh();
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//     // })
//     sweetAlert({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(() => {
//       axios.post('/api/delete',{id:id})
//       .then((response) => {
//         this.props.refresh();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     });
//   },
//   render: function() {
//     //使用者資料
//     //user_data= {"id":items.id, "name":items.name, "text":items.text}
//     let user_list = this.props.data.map(items => {
//         return(
//           <tr key={items.id}>
//             <td>{items.id}</td>
//             <td>Author: <a href={'/profile/'}> {items.name}</a></td>
//             <td>Comment: {items.text}</td>
//             <td>
//                 <Row >
//                   <Col xs={6} md={6} >
//                     <Update_Modal refresh={this.props.refresh} user_data= {{id:items.id, name:items.name, text:items.text}} />
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Button style={{marginLeft: -50 + 'px'}} onClick={(id) => this.handleSubmit(items.id)} bsStyle="danger">Delete</Button>
//                   </Col>
//                 </Row>
        
//             </td>
//           </tr>
//         )
//     });
//     return(
//     <Table >
//       <thead>
//         <tr>
//         <th>Id</th>
//         <th>Author</th>
//         <th>comment</th>
//         <th>編輯</th>
//         </tr>
//       </thead>
//     <tbody>
//     {user_list}
//     </tbody>
//     </Table>
//     );
//   }
// });
class CommentForm extends React.Component{
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
}
// let CommentForm = React.createClass({
//   getInitialState: function() {
//     return {author: '', text: ''};
//   },
//   handleAuthorChange: function(e) {
//     this.setState({author: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var author = this.state.author.trim();
//     var text = this.state.text.trim();
//     var user_data = {'author':author,'text':text};
//     if (!text || !author) {
//       return;
//     }
//     axios.post(this.props.url,{data:user_data})
//       .then((response) => {
//       })
//       .catch((err) => {
//         console.log(err);
//     });
//       setTimeout(() =>{
//         console.log("submit");
//         this.props.refresh();
//       },100);
      
//     // this.props.onCommentSubmit({author: author, text: text});
//     this.setState({author: '', text: ''});
//   },
//   render: function() {
//     return (
//        <Form inline onSubmit={this.handleSubmit}>
//           <FormGroup controlId="formInlineName">
//             <ControlLabel>Name:</ControlLabel>
//             {' '}
//             <FormControl type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="Your name" />
//           </FormGroup>
//           {' '}
//           <FormGroup controlId="formInlineText">
//             <ControlLabel>Comment:</ControlLabel>
//             {' '}
//             <FormControl type="text" value={this.state.text} onChange={this.handleTextChange} placeholder="Say something..." />
//           </FormGroup>
//           {' '}
//           <Button type="submit" value="Post">
//             <Glyphicon glyph="hand-up" /> Send
//           </Button>
//       </Form>
//     );
//   }
// });
class ModalForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        author: props.user_data.name,
        text: props.user_data.text,
        id: props.user_data.id
      };
  }
  handleAuthorChange(e){
    this.setState({author: e.target.value});
  }
  handleTextChange(e){
    this.setState({text: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var id = this.state.id;
    var user_data = {'author':author,'text':text,'id':id};
    console.log(user_data);
    if (!text || !author) {
      return;
    }
    axios.post('/api/update',{data:user_data})
      .then((response) => {
      })
      .catch((err) => {
        console.log(err);
    });
      setTimeout(() =>{
        console.log("submit");
        this.props.refresh();
        this.props.close();
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
}
// let ModalForm = React.createClass({
//   getInitialState: function() {
//     return {author: this.props.user_data.name, text: this.props.user_data.text, 'id': this.props.user_data.id};
//   },
//   handleAuthorChange: function(e) {
//     this.setState({author: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var author = this.state.author.trim();
//     var text = this.state.text.trim();
//     var id = this.state.id;
//     var user_data = {'author':author,'text':text,'id':id};
//     console.log(user_data);
//     if (!text || !author) {
//       return;
//     }
//     axios.post('/api/update',{data:user_data})
//       .then((response) => {
//       })
//       .catch((err) => {
//         console.log(err);
//     });
//       setTimeout(() =>{
//         console.log("submit");
//         this.props.refresh();
//         this.props.close();
//       },100);      
//     this.setState({author: '', text: ''});
//   },
//   render: function() {

//     return (
//        <Form inline onSubmit={this.handleSubmit}>
//           <FormGroup controlId="formInlineName">
//             <ControlLabel>Name:</ControlLabel>
//             {' '}
//             <FormControl type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="Your name" />
//           </FormGroup>
//           {' '}
//           <FormGroup controlId="formInlineText">
//             <ControlLabel>Comment:</ControlLabel>
//             {' '}
//             <FormControl type="text" value={this.state.text} onChange={this.handleTextChange} placeholder="Say something..." />
//           </FormGroup>
//           {' '}
//           <Button type="submit" value="Post">
//             <Glyphicon glyph="hand-up" /> Send
//           </Button>
//       </Form>
//     );
//   }
// });
class Update_Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
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
}
// let Update_Modal = React.createClass({
//   getInitialState() {
//     return { showModal: false };
//   },

//   close() {
//     this.setState({ showModal: false });
//   },

//   open() {
//     this.setState({ showModal: true });
//   },

//   render() {
//     const popover = (
//       <Popover id="modal-popover" title="popover">
//         very popover. such engagement
//       </Popover>
//     );
//     const tooltip = (
//       <Tooltip id="modal-tooltip">
//         wow.
//       </Tooltip>
//     );
//     return (
//       <div>
//         <Button bsStyle="primary" onClick={this.open}>Update</Button>
//         <Modal show={this.state.showModal} onHide={this.close}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
//             <h4>Tooltips in a modal</h4>
//             <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
//             <hr />
//             <ModalForm refresh={this.props.refresh} close={this.close} user_data={this.props.user_data}/>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.close}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// });
ReactDOM.render(
  <CommentBox pollInterval={2000} />,
  document.getElementById('content')
);
