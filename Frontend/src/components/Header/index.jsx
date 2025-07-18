import { useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

import { Dropdown } from '../Dropdown';

import '../../Styles/components/header.css';
import '../../Styles/profile.css';

function Header(){
    const loggedInUser = getLoggedInUser();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className='header'>
            {!loggedInUser 
                ?
                <>
                    <Link className='link' to="/signin">Entrar</Link>
                    <Link className='link' to="/signup">Cadastrar-se</Link>
                </>
                :
                <>
                    <button className='dropdown-menu' onClick={() => { setShowDropdown(!showDropdown) }}>
                        <IoMenu />
                    </button>
                    <Dropdown showDropdown={showDropdown}/>
                </>
            }
        </header>
    )
}

export default Header;