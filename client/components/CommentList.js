import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, Table } from 'react-bootstrap';
import UpdateModal from './ModalUpdate';

class CommentList extends React.Component {
  static propTypes = {
    todos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    deleteTodoHandle: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };
  handleSubmit(id) {
    this.props.deleteTodoHandle(id);
  }
  render() {
    //  使用者資料
    const userList = this.props.todos.todoList.map(items =>
      <tr key={items.id}>
        <td>{items.id}</td>
        <td><Link to={`profile/${items.name}/${items.text}`}>{items.name}</Link></td>
        <td>{items.text}</td>
        <td>
          <Row >
            <Col xs={6} md={6} >
              <UpdateModal
                updateTodo={this.props.updateTodo}
                userData={{ id: items.id, name: items.name, text: items.text }}
              />
            </Col>
            <Col xs={6} md={6}>
              <Button
                style={{ marginLeft: '-50px' }}
                onClick={() => { this.handleSubmit(items.id); }} bsStyle="danger"
              >Delete
              </Button>
            </Col>
          </Row>
        </td>
      </tr>,
    );
    return (
      <Table >
        <thead>
          <tr>
            <th>Id</th>
            <th>Author</th>
            <th>comments</th>
            <th>Editting</th>
          </tr>
        </thead>
        <tbody>
          { userList }
        </tbody>
      </Table>
    );
  }
}
export default CommentList;
