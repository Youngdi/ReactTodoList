import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalForm from './ModalForm';

class UpdateModal extends React.Component {
  static propTypes = {
    updateTodo: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.open}>Update</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>請輸入你要更新的項目</h4>
            <ModalForm
              close={this.close}
              userData={this.props.userData}
              updateTodo={this.props.updateTodo}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default UpdateModal;
