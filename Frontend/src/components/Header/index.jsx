import { useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

import Dropdown from '../Dropdown/index.jsx';

import '../../Styles/components/header.css';
import '../../Styles/profile.css';

function Header(){
    const loggedInUser = getLoggedInUser();
    const [showDropdown, setShowDropdown] = useState(false);

    if (!loggedInUser) {
        return (
            <header className='header'>
                <Link className='link' to="/signin">Entrar</Link>
                <Link className='link' to="/signup">Cadastrar-se</Link>
            </header>
        );
      }

    return (
        <header className='header'>
            <button className='dropdown-menu' onClick={() => { setShowDropdown(!showDropdown) }}>
                <IoMenu />
            </button>
            <Dropdown showDropdown={showDropdown}/>
        </header>
    )
}

export default Header;