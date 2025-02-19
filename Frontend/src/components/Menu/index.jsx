import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';

import './Styles.css';

function Menu(){
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    const logoff = () => {
        localStorage.setItem('loggedInUser', null);
        navigate('/login');
    };

    return (
        <div className='menu'>

            <main>
                <svg className='svg-profile'></svg>
                <div>
                    <h4>
                        {loggedInUser.username}
                    </h4>
                    <h4>
                        {loggedInUser.email}
                    </h4>
                </div>
            </main>

            <aside>

                <div>
                    <Link to="/dashboard">Painel</Link>
                </div>

                <div>
                    <Link to="/profile">Perfil do Usuário</Link>
                </div>

                <div>
                    <Link to="/users">Usuários Existentes</Link>
                </div>

                <div>
                    <Link to="/settings">Configurações</Link>
                </div>

                <div>
                    <button className='logoff-button' onClick={logoff}>Sair</button>
                </div>
            </aside>

        </div>
    )
}

export default Menu;