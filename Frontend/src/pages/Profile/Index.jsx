import { React } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form.jsx';

import './Styles.css';

function Profile() {
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        return (
            <div className='container'>
                    <div className='content-background'>
                        <main className='login-error-panel'>
                            <h2>Página não encontrada.</h2>
                            <h3>Faça login para acessar essa página ou volte para a página anterior.</h3>
                            <Link className='login-error-btn' to="/login">Entrar</Link>
                        </main>
                    </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <Header/>

            <div className='profile-content'>

                <div>
                    <main className='profile-panel'>
                        <svg className='svg-profile-bigger'></svg>
                        {loggedInUser.username} 
                    </main>

                    <aside className='profile-form'>
                        <Form loggedInUser={loggedInUser} />
                    </aside>
                </div>

            </div>

            <Footer/>
        </div>
    );
}

export default Profile;