import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { getLoggedInUser } from '../../utils/auth.js';
import { IoArrowBack, IoPencil } from "react-icons/io5";

import useUserById from '../../hooks/Users/useUserById.jsx';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Error from "../Error";
import Loading from '../Loading';

import '../../Styles/profile.css';

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
    }, [errors, id, setUpdateList, setUserId]);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return <Error/>; }

    // TELA DE LOADING
    if (loading) { return <Loading/>; }

    // TELA DE USUÁRIO INEXISTENTE
    if (!loading && errors) { 
        return (
            <div className='container'>
                <Header/>
                <div className='content content-profile'>

                    <main className='error-message'>

                        <div className='btn-bar'>
                            <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
                                <IoArrowBack className='return-icon' /> 
                            </button>
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
                        <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
                            <IoArrowBack className='return-icon' /> 
                        </button>

                        {loggedInUser.id === users?.id && (
                            <button className='edit-btn' title="Editar" onClick={() => navigate('/profile/edit')}>
                                <IoPencil className="edit-icon" />
                            </button>
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