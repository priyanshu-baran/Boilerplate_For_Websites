import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Error } from './Error';
import { Main } from './Main';
import { Home } from './Home';
import { About } from './About';
import { Profile } from './Profile';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <ToastContainer theme='dark'></ToastContainer>
      <Router>
        <Routes>
          <Route
            path='*'
            element={<Error />}
          />
          <Route
            path='/'
            element={<Main />}
          />
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/profile/:username'
            element={<Profile />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
        </Routes>
      </Router>
    </>
  );
};
