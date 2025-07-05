import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Form({ login, errors }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    // FUNÇÃO PARA ALTERAR DADOS DO FORMULÁRIO.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    // FUNÇÃO PARA REALIZAR O LOGIN DE USUÁRIO.
    const handleLogin = async (e) => {
        e.preventDefault();
        const foundUser = await login(user.email, user.password);
        if (!foundUser) return;
        const loggedInUser = JSON.stringify({ id: foundUser.user.id, username: foundUser.user.username, email: foundUser.user.email, });
        const token = JSON.stringify(foundUser.token);
        localStorage.setItem('loggedInUser', loggedInUser);
        localStorage.setItem('token', token);
        navigate('/dashboard');
    };


  return (
    <form className='sign-form' onSubmit={handleLogin}>

        <label>
            E-mail:
            <input className='sign-input' type="email" name="email" onChange={handleChange} value={user.email} required/>
        </label>

        <label>
            Senha:
            <label className='sign-input password'>
                <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} value={user.password} required/>
                <button className='show-btn' type='button' onClick={() => setShowPassword(prevState => !prevState)} value={showPassword}>{showPassword ? <IoEye/> : <IoEyeOff/>}</button>
            </label>
        </label>
        
        {errors && <span className='form-error' >{errors} </span>}
        
        <button className='sign-btn' type='submit'>Fazer login</button>

        <div>
            Não possui conta?
            <Link className='link' to="/signup">Criar conta</Link>
        </div>

    </form>
  );
}

export default Form;