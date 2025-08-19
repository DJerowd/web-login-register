import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import Routes from './routes.jsx';
import { AuthProvider } from './context/AuthContext';

import './Styles/global.css';
import './Styles/layout.css';
import './Styles/error.css';
import './Styles/components/inputs.css';
import './Styles/components/buttons.css';
import './Styles/components/toast.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer 
        className='toast'
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        draggable
        theme="dark"
        transition={Slide}
      />
    </AuthProvider>
  </StrictMode>
)
