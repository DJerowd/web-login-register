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
    const { userById, setUpdateUserByIdList, setUserId, loading, errors } = useUserById();
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

    // TELA DE LOADING
    if (loading && errors) { return <Loading/>; }

    // CARREGA DADOS DO USUÁRIO
    useEffect(() => {
        const fetchUsers = async () => {
            setUserId(id)
        };
        fetchUsers();
        setUpdateUserByIdList(prevState => !prevState);
    }, [errors]);

    return (
        <div className='container'>
            <Header/>
            <div className='profile-content'>
                <div>

                    <button className='return-btn' title="Voltar" onClick={() => navigate(loggedInUser.id === userById[0]?.id ? '/dashboard' : '/users')}> 
                        <IoArrowBack className='return-icon' /> 
                    </button>

                    {loggedInUser.id === userById[0]?.id && (
                        <button className='edit-btn' title="Editar" onClick={() => navigate('/profile/edit')}>
                            <IoPencil className="edit-icon" />
                        </button>
                    )}

                    <main className='profile-panel'>
                        <svg className='svg-profile-bigger'></svg>
                        {userById.map((user, index) => (
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