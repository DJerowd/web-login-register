import { React, useState, useEffect } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Dashboard() {
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        return (
            <div className='container'>
                <Header />
                    <div className='content'>
                        <main className='profile-panel'>
                            Faça login para acessar essa página.
                            <Link className='login-button' to="/login">Entrar</Link>
                        </main>
                    </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className='container'>
            <Header/>

            <div className='content'>
                <main className='profile-panel'>
                    Olá, {loggedInUser.username}.
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Dashboard;