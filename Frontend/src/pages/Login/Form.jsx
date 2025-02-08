import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles.css';

function Form() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    // FUNÇÃO PARA ALTERAR DADOS DO FORMULÁRIO.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    // FUNÇÃO PARA REALIZAR O LOGIN DE USUÁRIO.
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/home');
    };


  return (
    <form onSubmit={handleLogin}>

        <label>
            E-mail
            <input type="email" name="email" onChange={handleChange} value={user.email} required/>
        </label>

        <label>
            Senha
            <input type={"password"}  name="password" onChange={handleChange} value={user.password} required/>
        </label>
        
        <div>
            <button className='signup-button' type='submit'>Fazer login</button>
            <Link to="/signup">Não possui conta? Criar conta</Link>
        </div>

    </form>
  );
}

export default Form;