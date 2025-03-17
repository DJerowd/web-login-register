import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Styles.css';

function Settings() {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    // FUNÇÃO PARA DELETAR USUÁRIO
    const handleDelete = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Tem certeza de que deseja excluir este usuário? Todas as informações serão perdidas para sempre.");
        if (!confirm) {
            return;
        } else {
            await axios
            .delete("http://localhost:8800/users/" + loggedInUser.id)
            .then(({ data }) => {
                localStorage.setItem('loggedInUser', null);
                navigate('/login');
            })
            .catch(({ data }) => toast.error(data)
            );
        }
    };

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

    return (
        <div className='container'>

            <Header/>

            <div className='content'>
                <main className='settings-form'>

                    <h2>Excluir conta</h2>
                    <h3>Excluir a conta é um processo irreversível que apagará seus dados de forma irreversível.</h3>
                    <button className='delete-btn' onClick={handleDelete} >
                        <span class="text">
                            <h4>Excluir usuário</h4>
                        </span>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                            </svg>
                        </span>
                    </button>

                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Settings;