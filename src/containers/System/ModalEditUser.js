import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Alert
} from 'reactstrap';
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
  }
  componentDidMount() {
    let user = this.props.currentUser;
    this.setState({
      id: user.id,
      email: user.email,
      password: "noPassword",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address
    })
  }

  toggle = () => {
    this.props.toggleEditModal();
  };
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let index = 0; index < arrInput.length; index++) {
      if (!this.state[arrInput[index]]) {
        isValid = false;
        alert('Missing Parameter: ' + arrInput[index]);
        break;
      }
    }
    return isValid;
  };
  handleUpdateUser = async () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      await this.props.updateUser(this.state);
    }
  };
  handleInputValue = (event, key) => {
    let coppyState = { ...this.state };
    coppyState[key] = event.target.value;
    this.setState({
      ...coppyState,
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className='modal-user-container' size='lg'>
        <ModalHeader toggle={() => this.toggle()}>Edit Users</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input
                type='email'
                onChange={(event) => this.handleInputValue(event, 'email')}
                value={this.state.email}
                disabled
              />
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input
                type='password'
                onChange={(event) => this.handleInputValue(event, 'password')}
                value={this.state.password}
                disabled
              />
            </div>
            <div className='input-container'>
              <label>Firstname</label>
              <input
                type='text'
                onChange={(event) => this.handleInputValue(event, 'firstName')}
                value={this.state.firstName}
              />
            </div>
            <div className='input-container'>
              <label>Lastname</label>
              <input
                type='text'
                onChange={(event) => this.handleInputValue(event, 'lastName')}
                value={this.state.lastName}
              />
            </div>
            <div className='input-container max-width-input'>
              <label>Address</label>
              <input
                type='text'
                onChange={(event) => this.handleInputValue(event, 'address')}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' className='px-2' onClick={() => this.handleUpdateUser()}>
            Save Change
          </Button>{' '}
          <Button color='secondary' className='px-2' onClick={() => this.toggle()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
