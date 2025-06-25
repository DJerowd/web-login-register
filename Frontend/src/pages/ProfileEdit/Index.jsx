import { getLoggedInUser } from '../../utils/auth.js';
import useEditUser from '../../hooks/Users/useEditUser.jsx';

import { ReturnButton } from '../../components/Buttons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";
import Form from './Form.jsx';

import '../../Styles/form.css';
import '../../Styles/profile.css';

function ProfileEdit() {
    const loggedInUser = getLoggedInUser();
    const { edit, errors } = useEditUser();

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return ( <Error/> ); }

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
                            src='/assets/banner.jpg' // substitua pelo caminho real ou campo do usuário
                            alt='Banner do perfil'
                            onError={(e) => {e.target.onerror = null; e.target.src = '/default-banner.jpg'; }}
                        />
                        <div className='avatar-container'>
                            <img
                                className='avatar-image'
                                src='/assets/avatar.jpg' // substitua se tiver avatar do usuário
                                alt='Avatar do usuário'
                                onError={(e) => {e.target.onerror = null; e.target.src = '/default-avatar.jpg'; }}
                            />
                        </div>
                    </div>

                    <Form edit={edit} errors={errors} loggedInUser={loggedInUser} />

                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default ProfileEdit;