/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Loading } from './Loading';

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const usenavigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      usenavigate('/login');
    }
    async function fetchData() {
      const res = await axios.get(`http://localhost:5000/users/${username}`);
      setData(res.data);
    }
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <center>
            <h1 style={{ fontSize: '50px' }}>Profile Page</h1>
          </center>
          <ul
            style={{
              marginLeft: '60px',
              marginTop: '60px',
              fontSize: '40px',
            }}>
            <li>
              <b>
                <i>Username:</i>
              </b>
              &ensp;
              <u style={{ textDecoration: 'underline' }}>{data.username}</u>
            </li>
            <li>
              <b>
                <i>Email Address:</i>
              </b>
              &ensp;
              <u style={{ textDecoration: 'underline' }}>{data.email}</u>
            </li>
            <li>
              <b>
                <i>Gender:</i>
              </b>
              &ensp;
              <u style={{ textDecoration: 'underline' }}>{data.gender}</u>
            </li>
            <li>
              <b>
                <i>Country:</i>
              </b>
              &ensp;
              <u style={{ textDecoration: 'underline' }}>{data.country}</u>
            </li>
          </ul>
          <center>
            <Link
              to={'/home'}
              style={{ textDecoration: 'none' }}
              className='btn btn-primary'>
              Back to Home Page
            </Link>
          </center>
        </div>
      )}
    </div>
  );
};
