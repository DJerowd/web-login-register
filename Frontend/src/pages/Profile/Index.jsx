import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { getLoggedInUser } from '../../utils/auth.js';
import { IoArrowBack, IoPencil } from "react-icons/io5";

import useUserById from '../../hooks/Users/useUserById.jsx';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginError from '../loginError/Index.jsx';
import Loading from '../Loading/Index.jsx';

import './Styles.css';

function Profile() {
    const { id } = useParams();
    const { users, setUpdateList, loading, errors, setUserId } = useUserById();
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();

    // CARREGA DADOS DO USUÁRIO
    useEffect(() => {
        const fetchUsers = async () => {
            setUserId(id)
        };
        fetchUsers();
        setUpdateList(prevState => !prevState);
    }, [errors]);

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

    // TELA DE LOADING
    if (loading && errors) { return <Loading/>; }

    // TELA DE USUÁRIO INEXISTENTE
    if (errors) { 
        return (
            <div className='container'>
                <Header/>
                <div className='profile-content'>
                    <div className='error-message'>

                        <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
                            <IoArrowBack className='return-icon' /> 
                        </button>

                        <h2>{errors}</h2>
                        <h3>O usuário com o ID {id} não foi encontrado.</h3>

                    </div>
                </div>
                <Footer/>
            </div>
        );
     }

    return (
        <div className='container'>
            <Header/>
            <div className='profile-content'>
                <div>

                    <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
                        <IoArrowBack className='return-icon' /> 
                    </button>

                    {loggedInUser.id === users[0]?.id && (
                        <button className='edit-btn' title="Editar" onClick={() => navigate('/profile/edit')}>
                            <IoPencil className="edit-icon" />
                        </button>
                    )}

                    <main className='profile-panel'>
                        <svg className='svg-profile-bigger'></svg>
                        {users.map((user, index) => (
                            <ul class='profile-list' key={user.id}>
                                <tr>
                                    <th>Nome: </th>
                                    <th>{`${user.username}`}</th>
                                </tr>
                                <tr>
                                    <th>Email: </th>
                                    <th>{`${user.email}`}</th>
                                </tr>
                            </ul>
                        ))}
                    </main>

                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;