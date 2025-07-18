import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';

import ErrorPage from "../../components/ErrorPage";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../Styles/dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) return <ErrorPage/>;

    return (
        <div className='container'>
            <Header/>
            <div className='content content-dashboard'>
                <main>
                    <h2>Olá, {loggedInUser.username}.</h2>
                    <section className='options-panel'>
                        <button className='dashboard-btn' onClick={() => navigate(`/profile/${loggedInUser.id}`)}>Ver Perfil</button>
                        <button className='dashboard-btn' onClick={() => navigate(`/users`)}>Ver outros Usuários</button>
                    </section>
                </main>
            </div>
            <Footer/>
        </div>
    );
}