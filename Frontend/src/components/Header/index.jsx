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

                <Link className='header-icon' to="/"><IoHome /></Link>

                <div>
                    <Link className='link' to="/signin">Entrar</Link>
                    <Link className='link' to="/signup">Cadastrar-se</Link>
                </div>
                
            </header>
        );
      }

    return (
        <header className='header'>

            <Link className='header-icon' to="/"><IoHome /></Link>

            <svg className='svg-profile' onClick={toggleDropdown}></svg>

            {showDropdown && <Dropdown/>}

        </header>
    )
}

export default Header;