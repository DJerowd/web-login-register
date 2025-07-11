import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import useDeleteUser from '../../hooks/Users/useDeleteUser.jsx';

import { ReturnButton } from '../../components/Buttons';
import ConfirmModal from '../../components/Modal/ConfirmModal.jsx';
import ErrorPage from "../../components/ErrorPage";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../Styles/settings.css';

function Settings() {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();
    const { deleteUser, errors } = useDeleteUser();
    const [modalOpen, setModalOpen] = useState(false);
    const predefinedColors = ['#7FA000', '#409FFF', '#E74C3C', '#8E44AD'];
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor'));

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        localStorage.setItem('primaryColor', primaryColor);
    }, [primaryColor]);

    const handleDeleteUser = async () => {
        setModalOpen(false);
        const success = await deleteUser(loggedInUser.id);
        if (success) {
            navigate('/signin');
        }
    };

    if (!loggedInUser) return <ErrorPage/>;

    return (
        <div className='container'>
            <Header/>
            <div className='content content-settings'>
                <main className='settings'>
                    <div className='btn-bar'>
                        <ReturnButton/>
                        <h2>Configurações</h2>
                    </div>

                    {/* SELEÇÃO DE COR PADRÃO */}
                    <section>
                        <h3>Cor padrão</h3>
                        <p>Alterar a cor padrão do site:</p>

                        <div className="color-options">
                            {predefinedColors.map((color) => (
                                <button
                                    key={color}
                                    className={`color-button ${primaryColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setPrimaryColor(color)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* EXCLUIR CONTA */}
                    <section>
                        <h3>Excluir conta</h3>
                        <p>A ação de excluir a conta é um processo irreversível que apagará seus dados de forma irreversível:</p>
                        
                        <button className='delete-btn' onClick={ () => { setModalOpen(true) }} >
                            <span className="text">
                                Excluir usuário
                            </span>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                </svg>
                            </span>
                        </button>
                        {errors && <span className='form-error'>{errors}</span>}
                    </section>

                </main>
            </div>
            <ConfirmModal
                title="Deseja excluir o perfil permanentemente?"
                isOpen={modalOpen}
                onConfirm={handleDeleteUser}
                onCancel={() => { setModalOpen(false) }}
            />
            <Footer/>
        </div>
    );
}

export default Settings;