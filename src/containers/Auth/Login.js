import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import * as actions from "../store/actions"
import * as actions from '../../store/actions';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isshowpassword: false,
      errorMessage: ''
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  };
  handleLogin = async () => {
    this.setState({ errorMessage: '' });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errorCode !== 0) {
        this.setState({ errorMessage: data.message });
      } else if (data && data.errorCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log('user:', data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errorMessage: error.response.data.message });
        }
      }
    }
  };
  showHidePassword = () => {
    this.setState({
      isshowpassword: !this.state.isshowpassword
    });
  };
  render() {
    return (
      <div className='login-background'>
        <div className='login-container'>
          <div className='login-content row'>
            <div className='col-12 text-login'>Login</div>
            <div className='col-12 form-group login-input'>
              <label>Username:</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Your Username'
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className='col-12 form-group login-input'>
              <label>Password:</label>
              <div className='custom-input-password'>
                <input
                  type={this.state.isshowpassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Enter Your Password'
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span onClick={() => this.showHidePassword()}>
                  <i
                    className={
                      this.state.isshowpassword
                        ? 'fas fa-eye'
                        : 'fas fa-eye-slash'
                    }></i>
                </span>
              </div>
            </div>
            <div className='col-12 ' style={{ color: 'red' }}>
              {this.state.errorMessage}
            </div>
            <div className='col-12 form-group'>
              <button className='btn-login' onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className='col-12 form-group'>
              <label className='forgot-password'>Forgot your password?</label>
            </div>
            <div className='col-12 text-center'>
              <span className='text-other-login'>Or Login With:</span>
            </div>
            <div className='col-12 social-login'>
              <i className='fab fa-google-plus google'></i>
              <i className='fab fa-facebook facebook'></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state.app.language
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
