import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles.css';

function Form() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // FUNÇÃO PARA ALTERAR DADOS DO FORMULÁRIO.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    // FUNÇÃO PARA REALIZAR O REGISTRO DE USUÁRIO.
    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/home');
    };


  return (
    <form onSubmit={handleSignup}>

        <label>
            Nome de Usuário:
            <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>

        <label>
            E-mail
            <input type="email" name="email" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>

        <label>
            Senha
            <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete='off' required/>
        </label>

        <label>
            Confirmar Senha:
            <input type="Password" name="confirmPassword" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>
        
        <div>
            <button className='signup-button' type='submit'>Criar conta</button>
            <Link to="/login">Já possui uma conta? Faça login</Link>
        </div>

    </form>
  );
}

export default Form;