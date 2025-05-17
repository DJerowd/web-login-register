import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoList, IoSettings, IoLogOut } from "react-icons/io5";

import '../../Styles/components/dropdown.css';

function Dropdown(){
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    const logoff = () => {
        localStorage.setItem('loggedInUser', null);
        navigate('/signin');
    };

    return (
        <main className='dropdown'>
            <section>
                <h3>{loggedInUser.username}</h3>
                <p>{loggedInUser.email}</p>
            </section>

            <section>
                <Link className='dropdown-btn' to="/dashboard"> <IoList className='dropdown-icon'/> Painel</Link>

                <Link className='dropdown-btn' to="/settings"> <IoSettings className='dropdown-icon' /> Configurações</Link>

                <button className='dropdown-btn' onClick={logoff}> <IoLogOut className='dropdown-icon' /> Sair</button>
            </section>
        </main>
    )
}

export default Dropdown;