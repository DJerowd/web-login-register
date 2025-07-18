import { useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import useEditUser from '../../hooks/Users/useEditUser.jsx';

import { ReturnButton } from '../../components/Buttons';
import ErrorPage from "../../components/ErrorPage";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form.jsx';

import '../../Styles/form.css';
import '../../Styles/profile.css';

export default function ProfileEdit() {
    const loggedInUser = getLoggedInUser();
    const { edit, errors } = useEditUser();

    const [avatarPreview, setAvatarPreview] = useState('/assets/avatar.jpg');
    const [bannerPreview, setBannerPreview] = useState('/assets/banner.jpg');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (e.target.name == 'changeAvatar') setAvatarPreview(URL.createObjectURL(file));
            if (e.target.name == 'changeBanner') setBannerPreview(URL.createObjectURL(file));
        }
    };

    // ERRO LOGIN INATIVO
    if (!loggedInUser) return <ErrorPage/>;

    return (
        <div className='container'>
            <Header/>
            <div className='content content-profile'>

                <main>
                    <div className='btn-bar'>
                        <ReturnButton/>
                    </div>

                    <div className='profile-banner'>
                        <img
                            className='banner-image'
                            src={bannerPreview}
                            alt='Banner do perfil'
                            onError={(e) => {e.target.onerror = null; e.target.src = '/default-banner.jpg'; }}
                        />
                        <label className='image-edit-btn'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                            >
                                <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                            </svg>
                            <input type='file' accept='image/*' name="changeBanner" onChange={handleImageChange} style={{ display: 'none' }} />
                        </label>

                        <div className='avatar-container'>
                            <img
                                className='avatar-image'
                                src={avatarPreview}
                                alt='Avatar do usuário'
                                onError={(e) => {e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${loggedInUser.username}&rounded=true&background=transparent`; }}
                            />
                            <label className='image-edit-btn'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 min-x min-y"
                                    xmlSpace="preserve"
                                >
                                    <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                                </svg>
                                <input type='file' accept='image/*' name="changeAvatar" onChange={handleImageChange} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>

                    <Form edit={edit} errors={errors} loggedInUser={loggedInUser} />

                </main>

            </div>
            <Footer/>
        </div>
    );
};