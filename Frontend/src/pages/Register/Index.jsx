import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import Form from './Form';

import './Styles.css';

function Register() {
    return (
        <div className='container-register'>
            <Header/>

            <div className='content-register'>
                <main className='signup-form'>
                    <h2>Registre-se:</h2>

                    {/* <Form /> */}
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Register;