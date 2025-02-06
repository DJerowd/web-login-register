import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Login() {
  return (
    <div className='container-login'>
      <Header/>

      <div className='content-login'>
        <main>
          <h2>Fazer login:</h2>
        </main>
      </div>

      <Footer/>
    </div>
  );
}

export default Login;