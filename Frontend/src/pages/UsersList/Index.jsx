import { React } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';

import useUsers from '../../hooks/Users/useUsers';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import List from './List.jsx';

import './Styles.css';

function UsersList() {
    const { users, setUpdateUserList } = useUsers();
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        return (
            <div className='container'>
                    <div className='content-background'>
                        <main className='login-error-panel'>
                            <h2>Página não encontrada.</h2>
                            <h3>Faça login para acessar essa página ou volte para a página anterior.</h3>
                            <Link className='login-error-button' to="/login">Entrar</Link>
                        </main>
                    </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <Header/>

            <div className='content'>

                <main className='users-list'>
                    <Link className='login-error-button' to="/dashboard">Voltar</Link>
                    <List users={users} />
                </main>

            </div>

            <Footer/>
        </div>
    );
}

export default UsersList;