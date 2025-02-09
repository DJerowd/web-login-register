import { React } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Profile() {
    return (
        <div className='container'>
            <Header/>

            <div className='content'>
                <main className='profile-panel'>
                    Olá, Usuário.
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Profile;