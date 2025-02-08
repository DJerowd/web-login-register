import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

import './Styles.css';

function Login() {
    return (
        <div className='container-login'>
            <Header/>

            <div className='content-login'>
                <main className='signup-form'>
                    <h2>Fazer login:</h2>

                    <Form />
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Login;