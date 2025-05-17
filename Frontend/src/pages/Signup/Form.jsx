import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from 'react-router-dom';

import axios from 'axios';

function Form() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '', geral: '' });
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
        let newErrors = { username: '', email: '', password: '', confirmPassword: '', geral: '' };
        if ( !user.username || !user.email || !user.password || !user.confirmPassword ) {
            newErrors.geral = `Todos os campos devem ser preenchidos!`;
            setErrors(newErrors);
            return;
        } else if ( user.password != user.confirmPassword ) {
            newErrors.confirmPassword = `A senha e confirmação não coincidem!`;
            setErrors(newErrors);
            return;
        } else {
            await axios
            .post("http://localhost:8800/users", {
                username: user.username,
                email: user.email,
                password: user.password
        })
            .then(({ data }) => {
                newErrors.email = `Personagem ${user.username} | ${user.email} salvo! ${JSON.stringify(data)}`;
        })
            .catch(({ data }) => {
                newErrors.geral = `Erro ao salvar personagem ${JSON.stringify(data)}!`
        });
            setUser({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
        setErrors(newErrors);
        navigate('/signin');
    };


  return (
    <form className='sign-form' onSubmit={handleSignup}>

        <label>
            Nome de Usuário:
            <input className='sign-input' type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>
        {errors.username && <span className='form-error' >{errors.username}</span>}

        <label>
            E-mail:
            <input className='sign-input' type="email" name="email" placeholder="Insira um email válido" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>
        {errors.email && <span className='form-error' >{errors.email}</span>}

        <label>
            Senha:
            <label className='sign-input password'>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Crie uma senha" onChange={handleChange} value={user.password} autoComplete='off' required/>
                <button className='show-button' type='button' onClick={() => setShowPassword(prevState => !prevState)} value={showPassword}>{showPassword ? <IoEye/> : <IoEyeOff/>}</button>
            </label>
        </label>
        {errors.password && <span className='form-error' >{errors.password}</span>}

        <label>
            Confirmar Senha:
            <input className='sign-input' type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirme a senha" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>
        {errors.confirmPassword && <span className='form-error' >{errors.confirmPassword}</span>}
        
        {errors.geral && <span className='form-error' >{errors.geral}</span>}
        
        <button className='sign-btn' type='submit'>Criar conta</button>
        
        <div>
            Já possui uma conta?
            <Link className='link' to="/signin">Entre aqui</Link>
        </div>

    </form>
  );
}

export default Form;