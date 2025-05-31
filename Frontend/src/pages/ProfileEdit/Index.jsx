import { getLoggedInUser } from '../../utils/auth.js';

import { ReturnButton } from '../../components/Buttons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";
import Form from './Form.jsx';

import '../../Styles/form.css';
import '../../Styles/profile.css';

function ProfileEdit() {
    const loggedInUser = getLoggedInUser();

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

                    <svg className='svg-profile-bigger'></svg>

                    <Form loggedInUser={loggedInUser} />

                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default ProfileEdit;