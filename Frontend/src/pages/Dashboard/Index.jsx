import { React } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Dashboard() {
    const loggedInUser = getLoggedInUser();

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

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