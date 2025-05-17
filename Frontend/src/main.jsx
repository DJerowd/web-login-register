import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes.jsx';

import './Styles/global.css';
import './Styles/layout.css';
import './Styles/error.css';
import './Styles/components/inputs.css';
import './Styles/components/buttons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
)
