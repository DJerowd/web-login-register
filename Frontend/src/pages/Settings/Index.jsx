import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';

import axios from 'axios';

import { ReturnButton } from '../../components/Buttons';
import ModalConfirm from '../../components/Modal/Index.jsx';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";

import '../../Styles/settings.css';

function Settings() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    // FUNÇÃO PARA DELETAR USUÁRIO
    const handleDelete = async (e) => {
        e.preventDefault();
        await axios
        .delete("http://localhost:8800/users/" + loggedInUser.id)
        .then(() => {
            localStorage.setItem('loggedInUser', null);
            navigate('/signin');
        })
        .catch(({ data }) => console.log(data)
        );
    };
    
    // FUNÇÃO PARA CANCELAR EXCLUSÃO
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return ( <Error/> ); }

    return (
        <div className='container'>
            <Header/>
            <div className='content'>

                <main className='settings'>

                    <div className='btn-bar'>
                        <ReturnButton/>
                    </div>

                    <h2>Excluir conta</h2>
                    <p>Excluir a conta é um processo irreversível que apagará seus dados de forma irreversível.</p>
                    <button className='delete-btn' onClick={() => setIsModalOpen(true)} >
                        <span className="text">
                            Excluir usuário
                        </span>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                            </svg>
                        </span>
                    </button>

                </main>

            </div>
            <ModalConfirm
                isOpen={isModalOpen}
                title="Confirmar Ação"
                message="Tem certeza de que deseja continuar com esta ação?"
                onConfirm={handleDelete}
                onCancel={handleCancel}
            />
            <Footer/>
        </div>
    );
}

export default Settings;