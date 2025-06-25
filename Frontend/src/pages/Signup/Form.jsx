import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Form({ register, errors }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    // const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
        const success = await register(user);
        if (success) {
            setUser({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/signin');
        }
    };


  return (
    <form className='sign-form' onSubmit={handleSignup}>

        <label>
            Nome de Usuário:
            <input className='sign-input' type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>

        <label>
            E-mail:
            <input className='sign-input' type="email" name="email" placeholder="Insira um email válido" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>

        <label>
            Senha:
            <label className='sign-input password'>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Crie uma senha" onChange={handleChange} value={user.password} autoComplete='off' required/>
                <button className='show-button' type='button' onClick={() => setShowPassword(prevState => !prevState)} value={showPassword}>{showPassword ? <IoEye/> : <IoEyeOff/>}</button>
            </label>
        </label>

        <label>
            Confirmar Senha:
            <input className='sign-input' type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirme a senha" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>
        
        {errors && <span className='form-error' >{errors}</span>}
        
        <button className='sign-btn' type='submit'>Criar conta</button>
        
        <div>
            Já possui uma conta?
            <Link className='link' to="/signin">Entre aqui</Link>
        </div>

    </form>
  );
}

export default Form;