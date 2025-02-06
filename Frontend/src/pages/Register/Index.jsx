import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Register() {
    return (
        <div className='container-register'>
            <Header/>

            <div className='content-register'>
                <main>
                    <h2>Registre-se:</h2>
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Register;