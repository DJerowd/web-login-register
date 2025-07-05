import { useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";

import Dropdown from '../Dropdown/index.jsx';

import '../../Styles/components/header.css';
import '../../Styles/profile.css';

function Header(){
    const loggedInUser = getLoggedInUser();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (!loggedInUser) {
        return (
            <header className='header'>

                <Link className='header-icon dropdown-menu' to="/">
                    <IoHome />
                </Link>

                <div>
                    <Link className='link' to="/signin">Entrar</Link>
                    <Link className='link' to="/signup">Cadastrar-se</Link>
                </div>
                
            </header>
        );
      }

    return (
        <header className='header'>

            <Link className='header-icon dropdown-menu' to="/">
                <IoHome />
            </Link>

            <div className='dropdown-menu' onClick={toggleDropdown}>
                <img
                    className='avatar-image'
                    src='/assets/avatar.jpg'
                    alt='Avatar do usuário'
                    onError={(e) => {e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${loggedInUser.username}&rounded=true&background=random`; }}
                />
            </div>

            {showDropdown && <Dropdown/>}

        </header>
    )
}

export default Header;