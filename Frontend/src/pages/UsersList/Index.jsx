import { React, useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoSearch } from "react-icons/io5";

import useUsers from '../../hooks/Users/useUsers';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../Loading/Index.jsx';
import List from './List.jsx';

import './Styles.css';

function UsersList() {
    const [ search, setSearch ] = useState("");
    const { users, setUpdateUserList, loading } = useUsers();
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

    // TELA DE LOADING
    if (loading) {
        return <div className="spinner"> <Loading/> </div>;
    }

    return (
        <div className='container'>
            <Header/>

            <div className='content'>

                <main className='users-list'>
                    <div>
                        <Link className='return-btn' to="/dashboard"> <IoArrowBack className='return-icon' /> </Link>
                        <label>
                            <IoSearch className='icon'/>
                            <input type="text" placeholder="Pesquisar..." value={search} autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
                        </label>
                    </div>
                    <List users={users} />
                </main>

            </div>

            <Footer/>
        </div>
    );
}

export default UsersList;