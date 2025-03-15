import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { IoArrowBack, IoSearch } from "react-icons/io5";

import useUsers from '../../hooks/Users/useUsers';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginError from '../loginError/Index.jsx';
import Loading from '../Loading/Index.jsx';
import List from './List.jsx';

import './Styles.css';

function UsersList() {
    const [ search, setSearch ] = useState("");
    const { users, setUpdateUserList, loading } = useUsers();
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

    // TELA DE LOADING
    if (loading) { return <Loading/>; }

    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <main className='users-list'>

                    <div>
                        <button className='return-btn' onClick={() => navigate('/dashboard')}> 
                            <IoArrowBack className='return-icon' /> 
                        </button>
                        
                        <label>
                            <IoSearch className='icon'/>
                            <input 
                                type="text" 
                                placeholder="Pesquisar..." 
                                value={search} 
                                autoComplete='off' 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
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