/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from './Loading';

export const About = () => {
  const usenavigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      usenavigate('/login');
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <center>
          <h1 style={{ fontSize: '50px' }}>About Page</h1>
          <Link
            to={'/home'}
            style={{ textDecoration: 'none' }}
            className='btn btn-primary'>
            Back to Home Page
          </Link>
        </center>
      )}
    </div>
  );
};
