import { React } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';

import useUserById from '../../hooks/Users/useUserById.jsx';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginError from '../loginError/Index.jsx';
import Form from './Form.jsx';

import './Styles.css';

function ProfileEdit() {
    const { userById, setUpdateUserByIdList, setUserId, loading, errors } = useUserById();
    const loggedInUser = getLoggedInUser();

    // ERRO DE FALTA DE LOGIN
    if (!loggedInUser) { return ( <LoginError/> ); }

    return (
        <div className='container'>
            <Header/>

            <div className='profile-edit-content'>

                <div>
                    <main className='profile-edit-panel'>
                        <svg className='svg-profile-edit-bigger'></svg>
                        {loggedInUser.username} 
                    </main>

                    <aside className='profile-edit-form'>
                        <Form loggedInUser={loggedInUser} userById={userById} />
                    </aside>
                </div>

            </div>

            <Footer/>
        </div>
    );
}

export default ProfileEdit;