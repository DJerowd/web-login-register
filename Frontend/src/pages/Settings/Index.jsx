import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import useDeleteUser from '../../hooks/Users/useDeleteUser.jsx';

import { ReturnButton } from '../../components/Buttons';
import ErrorPage from "../../components/ErrorPage";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../Styles/settings.css';

function Settings() {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();
    const { deleteUser, errors } = useDeleteUser();

    // FUNÇÃO PARA DELETAR USUÁRIO
    const handleDelete = async (e) => {
        e.preventDefault();
        const success = await deleteUser(loggedInUser.id);
        if (success) {
            navigate('/signin');
        }
    };

    // ERRO LOGIN INATIVO
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

                    <h3>Excluir conta</h3>
                    <p>A ação de excluir a conta é um processo irreversível que apagará seus dados de forma irreversível.</p>
                    
                    <button className='delete-btn' onClick={handleDelete} >
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

                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default Settings;