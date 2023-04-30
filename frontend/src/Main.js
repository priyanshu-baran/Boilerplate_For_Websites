import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='main_body'>
          <h1 className='main_h1'>
            <i className='fa-solid fa-ranking-star'></i>&ensp;First&ensp;Site
          </h1>
          <div className='main'>
            <p className='main_p'>
              A{' '}
              <span className='s1'>
                <b>Designer knows</b>
              </span>
              <br />
              he has achieved perfection{' '}
              <b
                style={{
                  textDecoration: 'underline',
                  color: 'rgb(214, 143, 236)',
                }}>
                not
              </b>
              <br />
              when there is{' '}
              <span className='s2'>&nbsp;nothing left to add,</span>
              <br />
              but when there is
              <br />
              <span className='s3'>nothing left to take away...!!!</span>
            </p>
            <Link to={'/login'}>
              <button className='b'>
                Start Now&nbsp;
                <i className='fa-solid fa-play'></i>
                <i className='fa-solid fa-play'></i>
                <i className='fa-solid fa-play'></i>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
