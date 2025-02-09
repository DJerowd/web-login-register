import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

function Signup() {
    return (
        <div className='container'>
            <Header/>

            <div className='content'>
                <main className='signup-form'>

                    <h2>Registre-se:</h2>

                    <Form />

                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Signup;