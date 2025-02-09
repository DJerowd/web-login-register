import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Form() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });

    // FUNÇÃO PARA ALTERAR DADOS DO FORMULÁRIO.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    // FUNÇÃO PARA REALIZAR O REGISTRO DE USUÁRIO.
    const handleSignup = async (e) => {
        e.preventDefault();
        navigate('/login');
    };


  return (
    <form onSubmit={handleSignup}>

        <label>
            Nome de Usuário:
            <input type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>

        <label>
            E-mail
            <input type="email" name="email" placeholder="Insira um email válido" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>

        <label>
            Senha
            <input type="password" name="password" placeholder="Crie uma senha" onChange={handleChange} value={user.password} autoComplete='off' required/>
        </label>

        <label>
            Confirmar Senha:
            <input type="Password" name="confirmPassword" placeholder="Confirme a senha" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>
        
        <div>
            <button className='signup-button' type='submit'>Criar conta</button>
            <div>
                Já possui uma conta?
                <Link to="/login">Entre aqui</Link>
            </div>
        </div>

    </form>
  );
}

export default Form;