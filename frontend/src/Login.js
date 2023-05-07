/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { toast } from 'react-toastify';
import axios from 'axios';

import Model from './Model_test';
/* **************** NOTE ***************** */
/* This file (Model.js) is currently under errorfixing. You can try the above one,
 although you might encounter some error so please be patience as I am fixing
 this one and will upload the updated one soon......
 import Model from './Model'; */

export const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usenavigate = useNavigate();
  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validation) {
      const fetchData = async () => {
        await axios
          .get(
            `https://boilerplate-for-websites.netlify.app/users/${username}`
          )
          .then((res) => {
            if (res.data.username !== username) {
            } else {
              if (res.data.password === password) {
                toast.success('Login Successfully');
                sessionStorage.setItem('username', username);
                usenavigate('/home');
              } else {
                toast.error('Incorrect Password');
              }
            }
          })
          .catch((err) => {
            toast.error('User not found');
          });
      };
      fetchData();
    }
  };
  const validation = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
    }
    if (password === '' || password === null) {
      result = false;
    }
    return result;
  };
  useEffect(() => {
    sessionStorage.clear();
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);
  return (
    <div className='html body'>
      {isLoading ? (
        <Loading />
      ) : (
        <section className='ftco-section section'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6 text-center mb-5'>
                <h2 className='heading-section h2'>Login Page</h2>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-md-12 col-lg-10'>
                <div className='wrap d-md-flex'>
                  <div className='text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last'>
                    <div className='text w-100'>
                      <h2 className='h21'>Welcome to login</h2>
                      <p className='p1'>Don't have an account?</p>
                      <Link to='/signup'>
                        <button
                          href='#'
                          className='btn1 btn-white btn-outline-white button2'>
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='login-wrap p-4 p-lg-5'>
                    <div className='d-flex'>
                      <div className='w-100'>
                        <h3 className='mb-4 h3'>Sign In</h3>
                      </div>
                      <div className='w-100'>
                        <p className='social-media d-flex justify-content-end p'>
                          <button
                            href='#'
                            className='social-icon d-flex align-items-center justify-content-center a'>
                            <span className='fa fa-google'></span>
                          </button>
                          <button
                            href='#'
                            className='social-icon d-flex align-items-center justify-content-center a'>
                            <span className='fa fa-facebook'></span>
                          </button>
                          <button
                            href='#'
                            className='social-icon d-flex align-items-center justify-content-center a'>
                            <span className='fa fa-twitter'></span>
                          </button>
                        </p>
                      </div>
                    </div>
                    <form onSubmit={ProceedLogin}>
                      <div className='form-group mb-3'>
                        <label
                          className='label'
                          htmlFor='name'>
                          Username
                        </label>
                        <input
                          type='text'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className='form-control input'
                          placeholder='Username'
                          required
                        />
                      </div>
                      <div className='form-group mb-3'>
                        <label
                          className='label'
                          htmlFor='password'>
                          Password
                        </label>
                        <input
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className='form-control input'
                          placeholder='Password'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <button
                          type='submit'
                          className='form-control btn1 btn1-primary submit px-3 button2'>
                          Sign In
                        </button>
                      </div>
                      <div className='form-group d-md-flex'>
                        <div className='w-50 text-left'>
                          <label className='checkbox-wrap checkbox-primary mb-0'>
                            Remember Me
                            <input
                              className='input'
                              type='checkbox'
                              id='check'
                              defaultChecked
                            />
                            <span className='checkmark1'></span>
                          </label>
                        </div>
                        <div className='w-50 text-md-right'>
                          <a
                            href='#'
                            className='a'>
                            <Model />
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
