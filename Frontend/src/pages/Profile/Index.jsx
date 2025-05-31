import { useEffect } from 'react';
import { useParams } from "react-router";
import { getLoggedInUser } from '../../utils/auth.js';

import useUserById from '../../hooks/Users/useUserById.jsx';

import { ReturnButton, EditButton } from '../../components/Buttons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";
import Loading from '../Loading';

import '../../Styles/profile.css';

function Profile() {
    const { id } = useParams();
    const { users, setUpdateList, loading, errors, setUserId } = useUserById();
    const loggedInUser = getLoggedInUser();

    // CARREGA DADOS DO USUÁRIO
    useEffect(() => {
        setUserId(id)
        setUpdateList(prevState => !prevState);
    }, [loading, setUpdateList, setUserId]);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return <Error/>; }

    // TELA DE LOADING
    if (loading) { return <Loading/>; }

    // TELA DE USUÁRIO INEXISTENTE
    if (errors) { 
        return (
            <div className='container'>
                <Header/>
                <div className='content content-profile'>

                    <main className='error-message'>
                        <div className='btn-bar'>
                            <ReturnButton/>
                        </div>
                        <section>
                            {errors && <h2>{errors}</h2>}
                        </section>
                    </main>

                </div>
                <Footer/>
            </div>
        );
     }

    return (
        <div className='container'>
            <Header/>
            <div className='content content-profile'>

                <main>
                    <div className='btn-bar'>
                        <ReturnButton/>
                        {loggedInUser.id === users?.id && (
                            <EditButton/>
                        )}
                    </div>

                    <svg className='svg-profile-bigger'></svg>

                    <section>
                        <h3 id='username'>{`${users.username}`}</h3>
                        <p id='email'>{`${users.email}`}</p>
                    </section>

                </main>
                
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;