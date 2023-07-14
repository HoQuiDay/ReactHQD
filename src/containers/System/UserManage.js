import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    this.getAllUserFormReact();
  }
  getAllUserFormReact = async () => {
    let response = await getAllUsers('ALL');
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.users });
    }
  };
  handleAddNewUsers = () => {
    this.setState({ isOpenModalUser: true });
  };
  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };
  toggleEditModal = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };
  updateUser = async (data) => {
    try {
      let response = await editUserService(data);
      if (response && response.errorCode === 0) {
        await this.getAllUserFormReact();
        this.setState({ isOpenModalEditUser: false });
      } else {
        alert(response.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  };
  handleEditUser = async (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user
    });
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className='users-container'>
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {
          this.state.isOpenModalEditUser &&
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleEditModal={this.toggleEditModal}
            currentUser={this.state.userEdit}
            updateUser={this.updateUser}
          />
        }
        <div className='title text-center'>Manage User With React</div>
        <div className='mx-1'>
          <button
            className='btn btn-primary px-2'
            onClick={() => {
              this.handleAddNewUsers();
            }}>
            <i className='fas fa-plus px-1'></i> Add new users
          </button>
        </div>
        <div className='users-table mt-3 mx-1'>
          <table id='customers'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className='btn-edit'
                          onClick={() => {
                            this.handleEditUser(item);
                          }}>
                          <i className='fas fa-pencil-alt'></i>
                        </button>
                        <button
                          className='btn-delete'
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}>
                          <i className='fas fa-trash-alt'></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
