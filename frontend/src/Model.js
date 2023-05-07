/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { react_url } from '.';

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      isVisible: false,
      isShow: false,
      isValid: false,
      modal: false,
      email: '',
      modalInputEmail: '',
      _username: '',
      modalInputUsername: '',
      otp: '',
      modalInputOTP: '',
      pass1: '',
      modalInputPass1: '',
      pass2: '',
      modalInputPass2: '',
    };
  }
  handleChange(e) {
    const target = e.target;
    const email = target.email;
    const _username = target.name;
    const otp = target.name;
    const pass1 = target.name;
    const pass2 = target.name;
    const value = target.value;
    this.setState({
      [email]: value,
      [_username]: value,
      [otp]: value,
      [pass1]: value,
      [pass2]: value,
    });
  }
  handlePassSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${react_url}/users/update/${this.state.result.username}`, {
        password: this.state.modalInputPass1,
      })
      .then(() => {
        toast.success('Password updated successfully');
        this.toggleVisibility_2();
        this.toggleVisibility_1();
        this.modalClose();
      })
      .catch((err) => {
        toast.error(
          'Error occurred while updating the password. Please try again later.'
        );
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${react_url}/users/`)
      .then((res) => {
        this.setState(
          {
            email: this.state.modalInputEmail,
            _username: this.state.modalInputUsername,
            otp: this.state.modalInputOTP,
          },
          () => {
            this.setState(
              {
                result: res.data.find(
                  (user) => user.username === this.state.modalInputUsername
                ),
              },
              () => {
                if (this.state.result) {
                  axios
                    .get(`${react_url}/users/${this.state.result.username}`)
                    .then((res) => {
                      if (res.data.email === this.state.modalInputEmail) {
                        const templateParams = {
                          user: this.state.result.username,
                          to_email: this.state.result.email,
                          code: Math.floor(
                            100000 + Math.random() * 900000
                          ).toString(),
                        };
                        toast.success('OTP sent to your registered mail id');
                        this.toggleVisibility_1();
                        axios.get(`${react_url}/api/env`).then((res) => {
                          emailjs
                            .send(
                              res.data.serviceId,
                              res.data.templateId,
                              templateParams,
                              res.data.apiKey
                            )
                            .then(
                              async () => {
                                const validation = () => {
                                  return new Promise((resolve) => {
                                    const checkValidation = () => {
                                      if (
                                        this.state.modalInputOTP !==
                                        templateParams.code
                                      ) {
                                        setTimeout(checkValidation, 800);
                                      } else {
                                        resolve();
                                      }
                                    };
                                    checkValidation();
                                  });
                                };
                                await validation();
                                this.toggleVisibility_2();
                                const recheck = () => {
                                  return new Promise((resolve) => {
                                    const reChecking = () => {
                                      if (
                                        this.state.modalInputPass1 > 8 &&
                                        this.state.modalInputPass1 ===
                                          this.state.modalInputPass2
                                      ) {
                                        console.log('inside true');
                                        this.setState(
                                          (prevState) => ({
                                            isValid: !prevState.isValid,
                                            pass1: this.state.modalInputPass1,
                                            pass2: this.state.modalInputPass2,
                                          }),
                                          () => {
                                            console.log(this.state.isValid);
                                            resolve();
                                          }
                                        );
                                        // this.setState(
                                        //   (prevState) => ({
                                        //     isValid: !prevState.isValid,
                                        //   }),
                                        //   () => {
                                        //   }
                                        // );
                                      } else {
                                        console.log('inside false');
                                        this.setState({ isValid: false });
                                        setTimeout(reChecking, 1000);
                                      }
                                    };
                                    reChecking();
                                  });
                                };
                                window.recheck = recheck;
                                // await recheck();
                                console.log('done checking');
                              },
                              (err) => {
                                toast.error(
                                  'Error occurred while sending the email. Please try again later.'
                                );
                              }
                            );
                        });
                      } else toast.error('Email ID is not registered with us');
                    })
                    .catch((err) => {
                      toast.error(
                        `Unable to fetch the ${this.state.result.username} database`
                      );
                    });
                } else
                  toast.error('User with provided username does not exist');
              }
            );
          }
        );
      })
      .catch((err) => {
        toast.error('Unable to fetch database');
      });
  };

  modalOpen() {
    this.setState({ modal: true });
  }
  modalClose() {
    this.setState({
      modalInputEmail: '',
      modalInputUsername: '',
      modalInputOTP: '',
      modal: false,
      isVisible: false,
      isShow: false,
      isValid: false,
    });
  }
  toggleVisibility_1 = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  };
  toggleVisibility_2 = () => {
    this.setState((prevState) => ({
      isShow: !prevState.isShow,
    }));
  };
  render() {
    return (
      <div className='modal_test'>
        <a
          href='#'
          className='a'
          onClick={(e) => this.modalOpen(e)}>
          Forgot Password
        </a>
        <Modal
          show={this.state.modal}
          handleClose={(e) => this.modalClose(e)}>
          <h2>Forgot Password..??</h2>
          <div style={{ padding: '5px' }}></div>
          <div className='form-group'>
            <label className={this.state.isVisible ? 'isVisible' : 'isvisible'}>
              Username:
            </label>
            <input
              type='text'
              placeholder='Enter your username'
              value={this.state.modalInputUsername}
              name='modalInputUsername'
              onChange={(e) => this.handleChange(e)}
              className={
                this.state.isVisible
                  ? 'isVisible modalinput'
                  : 'isvisible modalinput'
              }
            />
            <div style={{ padding: '10px' }}></div>
            <label className={this.state.isVisible ? 'isVisible' : 'isvisible'}>
              Enter Email:
            </label>
            <input
              type='text'
              placeholder='Enter your registered mail id'
              value={this.state.modalInputEmail}
              name='modalInputEmail'
              onChange={(e) => this.handleChange(e)}
              className={
                this.state.isVisible
                  ? 'isVisible modalinput modalinput2'
                  : 'isvisible modalinput modalinput2'
              }
            />
            <div style={{ padding: '0px' }}></div>
            {/* <div>Resend OTP &nbsp; {`${value}`}</div> */}
            <label
              className={
                this.state.isVisible
                  ? this.state.isShow
                    ? 'isVisible'
                    : 'isvisible'
                  : 'isVisible'
              }>
              Enter OTP:
            </label>
            <input
              type='password'
              value={this.state.modalInputOTP}
              name='modalInputOTP'
              onChange={(e) => this.handleChange(e)}
              className={
                this.state.isVisible
                  ? this.state.isShow
                    ? 'isVisible modalinput modalinput3'
                    : 'isvisible modalinput modalinput3'
                  : 'isVisible modalinput modalinput3'
              }
            />
            <div style={{ padding: '10px' }}></div>
            {!this.state.isVisible && (
              <div>OTP will be sent to your registered mail id</div>
            )}
          </div>
          <div style={{ padding: '-5px' }}></div>
          <div className='form-group'>
            {!this.state.isVisible ? (
              <button
                id='__btn'
                onClick={(e) => this.handleSubmit(e)}
                className='modalwrapper modala'
                type='button'>
                Send OTP
              </button>
            ) : this.state.isShow ? (
              <div>
                <label>Enter New Password:</label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  value={this.state.modalInputPass1}
                  name='modalInputPass1'
                  onChange={(e) => this.handleChange(e)}
                  className='modalinput modalinput4'
                />
                <div style={{ padding: '10px' }}></div>
                <label>Re-Enter Password:</label>
                <input
                  type='password'
                  // placeholder='Re-Enter Password'
                  value={this.state.modalInputPass2}
                  name='modalInputPass2'
                  onChange={(e) => this.handleChange(e)}
                  className='modalinput modalinput5'
                />
                <div style={{ padding: '-5px' }}></div>
                <button
                  id='__btn'
                  // disabled={!(this.state.isValid)}
                  onClick={(e) => this.handlePassSubmit(e)}
                  className='modalwrapper modala'>
                  Confirm
                </button>
              </div>
            ) : (
              <div className='__loading'>
                Verifying...&nbsp;&nbsp;&nbsp;
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Model;

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal d-block' : 'modal d-none';
  return (
    <div className={showHideClassName}>
      <div className='modal-container modalcontent'>
        {children}
        <a
          href='#'
          className='modal-close a'
          onClick={handleClose}>
          Cancel
        </a>
      </div>
    </div>
  );
};
