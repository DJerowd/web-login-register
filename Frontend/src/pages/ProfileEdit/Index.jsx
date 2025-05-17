import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { IoArrowBack } from "react-icons/io5";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";
import Form from './Form.jsx';

import '../../Styles/form.css';
import '../../Styles/profile.css';

function ProfileEdit() {
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return ( <Error/> ); }

    return (
        <div className='container'>
            <Header/>
            <div className='content content-profile'>

                <main>
                    <div className='btn-bar'>
                        <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
                            <IoArrowBack className='return-icon' /> 
                        </button>
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