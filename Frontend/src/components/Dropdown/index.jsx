import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoList, IoSettings, IoLogOut } from "react-icons/io5";

import './Styles.css';

function Dropdown(){
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    const logoff = () => {
        localStorage.setItem('loggedInUser', null);
        navigate('/login');
    };

    return (
        <div className='dropdown'>

            <main>
                <div>
                    <h4>{loggedInUser.username}</h4>
                    <h4>{loggedInUser.email}</h4>
                </div>
            </main>

            <aside>

                <div>
                    <Link to="/dashboard"> <IoList className='dropdown-icon'/> Painel</Link>
                </div>

                <div>
                    <Link to="/settings"> <IoSettings className='dropdown-icon' /> Configurações</Link>
                </div>

                <div>
                    <button className='logoff-btn' onClick={logoff}> <IoLogOut className='dropdown-icon' /> Sair</button>
                </div>
            </aside>

        </div>
    )
}

export default Dropdown;