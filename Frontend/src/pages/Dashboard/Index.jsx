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

            <div className='dashboard-content'>

                <main className='dashboard-panel'>
                    Olá, {loggedInUser.username}.
                </main>

                <aside className='options-panel'>
                    <Link to={`/profile/${loggedInUser.id}`}>Ver Perfil</Link>
                    <Link to="/users">Ver outros Usuários</Link>
                </aside>

            </div>

            <Footer/>
        </div>
    );
}

export default Dashboard;