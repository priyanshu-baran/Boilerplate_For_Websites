import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { App } from './App';
import './css/index.css';
import './css/home.css';
import './css/login.css';
import './css/signup.css';
import './extraaaas/material-design-iconic-font.min.css';
import './css/error.css';
import './css/loading.css';
import './css/main.css';
import './css/modal.css';

// export const react_url='http://localhost:5000'
export const react_url = 'https://boilerplate-for-websites.netlify.app';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
