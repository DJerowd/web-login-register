import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form.jsx';

import './Styles.css';

function Settings() {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

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
                <main className='signup-form'>

                    <h2>Informações da conta</h2>
                    <Form loggedInUser={loggedInUser} />

                    <h2>Excluir conta</h2>
                    <h3>Excluir a conta é um processo irreversível que apagará seus dados de forma irreversível.</h3>
                    <button className='signup-button' onClick={handleDelete} >Excluir usuário</button>

                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Settings;