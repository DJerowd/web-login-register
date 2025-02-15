import { useState } from 'react';
import { getLoggedInUser } from '../../utils/auth.js';
import { Link } from 'react-router-dom';
import Menu from '../Menu/index.jsx';

import './Styles.css';

function Header(){
    const loggedInUser = getLoggedInUser();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    if (!loggedInUser) {
        return (
            <header className='header'>

                <div>
                    <Link to="/">Home</Link>
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
                <Link to="/">Home</Link>
            </div>

            <div>
                <svg className='svg-profile' onClick={toggleMenu}></svg>
            </div>

            {showMenu && <Menu/>}

        </header>
    )
}

export default Header;