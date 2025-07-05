import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';

import ErrorPage from "../../components/ErrorPage";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../Styles/dashboard.css';

function Dashboard() {
    const loggedInUser = getLoggedInUser();

    // ERRO LOGIN INATIVO
    if (!loggedInUser) return <ErrorPage/>;

    return (
        <div className='container'>
            <Header/>

            <div className='content content-dashboard'>

                <main>
                    <h2>Olá, {loggedInUser.username}.</h2>
                
                    <section className='options-panel'>
                        <Link className='dashboard-btn' to={`/profile/${loggedInUser.id}`}>Ver Perfil</Link>
                        <Link className='dashboard-btn' to="/users">Ver outros Usuários</Link>
                    </section>

                </main>

            </div>

            <Footer/>
        </div>
    );
}

export default Dashboard;