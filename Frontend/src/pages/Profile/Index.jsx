import { useEffect } from 'react';
import { useParams } from "react-router";

import { getLoggedInUser } from '../../utils/auth.js';
import useUserById from '../../hooks/Users/useUserById.jsx';

import { ReturnButton, EditButton } from '../../components/Buttons';
import ErrorPage from '../../components/ErrorPage';
import LoadingPage from '../../components/LoadingPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../Styles/profile.css';

function Profile() {
    const { id } = useParams();
    const { users, loading, errors, setUserId } = useUserById();
    const loggedInUser = getLoggedInUser();

    // CARREGA DADOS DO USUÁRIO
    useEffect(() => {
        const fetchdata = async () => {
            if (id) {
                setUserId(id)
            };
        };
        fetchdata();
    }, [id, loading, setUserId]);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) return <ErrorPage/>;

    return (
        <div className='container'>
            <Header/>
            { loading ? <LoadingPage/> :
            <div className='content content-profile'>

                {errors ?
                    <main>
                        <div className='btn-bar'>
                            <ReturnButton/>
                        </div>
                        {errors && <h2 className={'form-error'}>{errors}</h2>}
                    </main>
                :
                    <main>
                        <div className='btn-bar'>
                            <ReturnButton/>
                            {loggedInUser.id === users?.id && (
                                <EditButton/>
                            )}
                        </div>

                        {/* <svg className='svg-profile-bigger'></svg> */}
                        <div className='profile-banner'>
                            <img
                                className='banner-image'
                                src='/assets/banner.jpg'
                                alt='Banner do perfil'
                                onError={(e) => {e.target.onerror = null; e.target.src = '/default-banner.jpg'; }}
                            />
                            <div className='avatar-container'>
                                <img
                                    className='avatar-image'
                                    src='/assets/avatar.jpg'
                                    alt='Avatar do usuário'
                                    onError={(e) => {e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${users.username}&rounded=true&background=transparent`; }}
                                />
                            </div>
                        </div>

                        <section>
                            <h3 id='username'>{`${users.username}`}</h3>
                            <p id='email'>{`${users.email}`}</p>
                        </section>

                    </main>
                }
                
            </div>
            }
            <Footer/>
        </div>
    );
}

export default Profile;