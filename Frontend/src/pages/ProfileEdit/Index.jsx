import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { IoArrowBack } from "react-icons/io5";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginError from '../loginError/Index.jsx';
import Form from './Form.jsx';

import './Styles.css';

function ProfileEdit() {
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

    return (
        <div className='container'>
            <Header/>

            <div className='profile-edit-content'>
                <div>

                    <button className='return-btn' title="Voltar" onClick={() => navigate(`/profile/${loggedInUser.id}`)}> 
                        <IoArrowBack className='return-icon' /> 
                    </button>

                    <main className='profile-edit-panel'>
                        <svg className='svg-profile-edit-bigger'></svg>
                        {loggedInUser.username} 
                    </main>

                    <aside className='profile-edit-form'>
                        <Form loggedInUser={loggedInUser} />
                    </aside>

                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default ProfileEdit;