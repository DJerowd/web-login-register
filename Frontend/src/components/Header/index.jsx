import { Link } from 'react-router-dom';
import './Styles.css';

function Header(){
    return (
        <header>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/login">Entrar</Link>
                <Link to="/signup">Cadastrar-se</Link>
            </div>
        </header>
    )
}

export default Header;