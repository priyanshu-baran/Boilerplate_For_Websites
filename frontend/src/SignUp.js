import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Loading } from './Loading';

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [coPassword, setCoPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const usenavigate = useNavigate();
  const isValidate = () => {
    let isValid = true;
    axios
      .get(
        'https://boilerplate-for-websites.netlify.app/.netlify/functions/server/users/'
      )
      .then((res) => {
        const foundUser = res.data.find((user) => user.username === username);
        if (isValid) {
          if (foundUser) {
            isValid = false;
            toast.warning('User already exist');
          } else {
            if (password.length < 8 && coPassword.length < 8) {
              isValid = false;
              toast.warning('Password length is too small (min-length: 8');
            } else {
              if (password !== coPassword) {
                isValid = false;
                toast.error('Enter same values in both the Password fields');
              } else {
                if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                } else {
                  isValid = false;
                  toast.warning('Enter valid email address (example@abc.com)');
                }
              }
            }
          }
        }
      });
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
      let obj = { username, password, email, country, gender };
      axios
        .post(
          'https://boilerplate-for-websites.netlify.app/.netlify/functions/server/users/add',
          obj
        )
        .then((res) => {
          toast.success('Registered Successfully');
          usenavigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div className='body1'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='wrapper'>
          <div className='inner'>
            <form
              onSubmit={handleSubmit}
              className='form1'>
              <h3 className='h32'>Registration Form</h3>
              <div className='form-group1'>
                <div className='form-wrapper'>
                  <label htmlFor=''>Username:</label>
                  <div className='form-holder'>
                    <i className='zmdi zmdi-account-o'></i>
                    <input
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='form-control1 input1'
                      required
                    />
                  </div>
                </div>
                <div className='form-wrapper'>
                  <label htmlFor=''>Email:</label>
                  <div className='form-holder'>
                    <i style={{ fontStyle: 'normal', fontSize: '15px' }}>@</i>
                    <input
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='form-control1 input1'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group1'>
                <div className='form-wrapper'>
                  <label htmlFor=''>Password:</label>
                  <div className='form-holder'>
                    <i className='zmdi zmdi-lock-outline'></i>
                    <input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='form-control1 input1'
                      placeholder='********'
                      required
                    />
                  </div>
                </div>
                <div className='form-wrapper'>
                  <label htmlFor=''>Confirm Password:</label>
                  <div className='form-holder'>
                    <i className='zmdi zmdi-lock-outline'></i>
                    <input
                      type='password'
                      value={coPassword}
                      onChange={(e) => setCoPassword(e.target.value)}
                      className='form-control1 input1'
                      placeholder='********'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group1'>
                <div className='form-wrapper'>
                  <label htmlFor=''>Country:</label>
                  <div className='form-holder selectsign input2'>
                    <select
                      name=''
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className='form-control1 selectup input2'
                      required>
                      <option value=''>Choose any one</option>
                      <option value='India'>India</option>
                      <option value='Any Other'>Any Other</option>
                    </select>
                    <i className='zmdi zmdi-pin fix2'></i>
                  </div>
                </div>
                <div className='form-wrapper'>
                  <label htmlFor=''>Gender:</label>
                  <div className='form-holder selectsign'>
                    <select
                      name=''
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className='form-control1 selectup input3'
                      required>
                      <option value=''>Choose any one</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </select>
                    <i className='zmdi zmdi-face'></i>
                  </div>
                </div>
              </div>
              <div className='form-end'>
                <div className='checkbox1'>
                  <label style={{ cursor: 'pointer' }}>
                    I have read and agree to the privacy policy, terms of
                    service and community guidelines.
                    <input
                      type='checkbox'
                      id='check'
                      required
                    />
                    <span className='checkmark'></span>
                  </label>
                  <div style={{ marginTop: '15px' }}></div>
                  <Link to='/login'>Already have an account?</Link>
                </div>
                <div className='button-holder'>
                  <button className='button1'>Register Now</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
