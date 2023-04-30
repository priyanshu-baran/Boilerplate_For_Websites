/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Loading } from './Loading';
let username;

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const usenavigate = useNavigate();
  useEffect(() => {
    username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      usenavigate('/login');
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);
  const clicked = () => {
    const span = document.getElementById('redmark');
    span.setAttribute('class', 'hide');
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className='topnav'>
            <h1 className='h_1'>
              <i className='fa-solid fa-ranking-star'></i>&ensp;First&ensp;Site
            </h1>
            <form
              role='search'
              id='form'>
              <input
                type='search'
                id='query'
                name='q'
                placeholder='Search'
                className='inputmain'
                autoComplete='off'
              />
            </form>
            <div className='buttons b0'>
              <Link to='/home'>
                <button className='blob-btn'>
                  Home
                  <span className='blob-btn__inner'>
                    <span className='blob-btn__blobs'>
                      <span className='blob-btn__blob'></span>
                      <span className='blob-btn__blob'></span>
                      <span className='blob-btn__blob'></span>
                      <span className='blob-btn__blob'></span>
                    </span>
                  </span>
                </button>
              </Link>
              <br />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'>
                <defs>
                  <filter id='goo'>
                    <feGaussianBlur
                      in='SourceGraphic'
                      result='blur'
                      stdDeviation='10'></feGaussianBlur>
                    <feColorMatrix
                      in='blur'
                      mode='matrix'
                      values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7'
                      result='goo'></feColorMatrix>
                    <feBlend
                      in2='goo'
                      in='SourceGraphic'
                      result='mix'></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
            <div className='buttons b1'>
              <Link to='/about'>
                <button className='blob-btn'>
                  About
                  <span className='blob-btn__inner'>
                    <span className='blob-btn__blobs'>
                      <span className='blob-btn__blob'></span>
                      <span className='blob-btn__blob'></span>
                      <span className='blob-btn__blob'></span>
                      <span className='blob-btn__blob'></span>
                    </span>
                  </span>
                </button>
              </Link>
              <br />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'>
                <defs>
                  <filter id='goo'>
                    <feGaussianBlur
                      in='SourceGraphic'
                      result='blur'
                      stdDeviation='10'></feGaussianBlur>
                    <feColorMatrix
                      in='blur'
                      mode='matrix'
                      values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7'
                      result='goo'></feColorMatrix>
                    <feBlend
                      in2='goo'
                      in='SourceGraphic'
                      result='mix'></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
            <nav className='ico3 navbar navbar-expand-lg navbar-light bg-light'>
              <div className='container-fluid'>
                <ul className='navbar-nav home_ul'>
                  <li className='nav-item dropdown'>
                    <a
                      className='ico nav-link dropdown-toggle hidden-arrow a1'
                      href='#'
                      id='navbarDropdownMenuLink'
                      role='button'
                      data-mdb-toggle='dropdown'
                      aria-expanded='false'>
                      <i
                        className='ico1 fa-solid fa-cart-shopping'
                        title='View your items'></i>
                      <span className='badge rounded-pill badge-notification bg-danger'>
                        1
                      </span>
                    </a>
                    <ul
                      className='dropdown-menu dropdown-menu-end home_ul'
                      aria-labelledby='navbarDropdownMenuLink'>
                      <li>
                        <a
                          className='dropdown-item a1'
                          href='#'>
                          View Cart
                        </a>
                      </li>
                      <li>
                        <a
                          className='dropdown-item a1'
                          href='#'>
                          Edit Item
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
            <a
              type='button'
              className='ico4 a1'
              data-mdb-toggle='modal'
              data-mdb-target='#staticBackdrop'>
              <i
                className='ico2 fa-solid fa-bell'
                title='View Notifications'></i>
              <span
                className='badge bg-danger badge-dot'
                id='redmark'></span>
            </a>
            <div
              className='modal fade'
              id='staticBackdrop'
              data-mdb-backdrop='static'
              data-mdb-keyboard='false'
              tabIndex='-1'
              aria-labelledby='staticBackdropLabel'
              aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5
                      className='fix1 modal-title'
                      id='staticBackdropLabel'>
                      Notifications
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-mdb-dismiss='modal'
                      aria-label='Close'></button>
                  </div>
                  <div className='fix2 modal-body'>
                    Hey there...!!&ensp; You have new Notifications
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-mdb-dismiss='modal'
                      onClick={clicked}>
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <div className='container-fluid'>
                <ul className='navbar-nav home_ul'>
                  <li className='nav-item dropdown'>
                    <a
                      className='ico icoo nav-link dropdown-toggle d-flex align-items-center hidden-arrow a1'
                      href='#'
                      id='navbarDropdownMenuLink'
                      role='button'
                      data-mdb-toggle='dropdown'
                      aria-expanded='false'>
                      <img
                        src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp'
                        className='ico5 rounded-circle'
                        alt='Portrait of a Woman'
                        loading='lazy'
                      />
                    </a>
                    <ul
                      className='dropdown-menu home_ul'
                      aria-labelledby='navbarDropdownMenuLink'>
                      <li>
                        <Link
                          to={`/profile/${username}`}
                          className='dropdown-item a1'>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/login'
                          onClick={() => toast.success('Logout Successfully')}
                          className='dropdown-item a1'>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div style={{ paddingBottom: '20px' }}></div>
          <div className='home'>
            <center>
              <h1 style={{ fontSize: '50px' }}>Home Page</h1>
              <h2>Welcome {username}</h2>
            </center>
          </div>
        </div>
      )}
    </div>
  );
};
