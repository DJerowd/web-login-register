import { useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";

import Dropdown from '../Dropdown/index.jsx';

import './Styles.css';

function Header(){
    const loggedInUser = getLoggedInUser();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (!loggedInUser) {
        return (
            <header className='header'>

                <div>
                    <Link to="/"><IoHome className='header-icon' /></Link>
                </div>

                <div>
                    <Link to="/login">Entrar</Link>
                    <Link to="/signup">Cadastrar-se</Link>
                </div>
                
            </header>
        );
      }

    return (
        <header className='header'>

            <div>
                <Link to="/"><IoHome className='header-icon' /></Link>
            </div>

            <div>
                <svg className='svg-profile' onClick={toggleDropdown}></svg>
            </div>

            {showDropdown && <Dropdown/>}

        </header>
    )
}

export default Header;