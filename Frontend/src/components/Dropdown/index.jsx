import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth.js';
import { IoHome, IoPerson, IoList, IoSettings, IoLogOut } from "react-icons/io5";

import '../../Styles/components/dropdown.css';

function Dropdown({ showDropdown }){
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    const logoff = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div className={showDropdown ? 'dropdown dropdown-show' : 'dropdown'}>
            <nav className={showDropdown ? 'dropdown-nav dropdown-nav-show' : 'dropdown-nav'}>
                <a className='dropdown-item' onClick={() => { navigate(`/`) }}>
                    <IoHome className='dropdown-icon'/> Home 
                </a>

                <a className='dropdown-item' onClick={() => { navigate(`/profile/${loggedInUser.id}`) }}> 
                    <IoPerson className='dropdown-icon'/> Meu Perfil 
                </a>
                
                <a className='dropdown-item' onClick={() => { navigate(`/dashboard`) }}> 
                    <IoList className='dropdown-icon'/> Painel
                </a>

                <a className='dropdown-item' onClick={() => { navigate(`/settings`) }}> 
                    <IoSettings className='dropdown-icon'/> Configurações 
                </a>

                <a className='dropdown-item' onClick={logoff}> 
                    <IoLogOut className='dropdown-icon'/> Sair 
                </a>
            </nav>
        </div>
    )
}

export default Dropdown;