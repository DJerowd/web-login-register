import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";

import axios from 'axios';

function Form({loggedInUser}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ id: loggedInUser.id, username: loggedInUser.username, email: loggedInUser.email, password: loggedInUser.password, confirmPassword: loggedInUser.confirmPassword });
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '', geral: '' });
    const [showPassword, setShowPassword] = useState(false);

    // FUNÇÃO PARA ALTERAR DADOS DO USUÁRIO.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    // FUNÇÃO PARA ALTERAR O REGISTRO DE USUÁRIO.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedUser = JSON.stringify({ id: user.id, username: user.username, email: user.email, password: user.password });
        let newErrors = { username: '', email: '', password: '', confirmPassword: '', geral: '' };
        if ( !user.username || !user.email || !user.password || !user.confirmPassword ) {
            newErrors.geral = `Todos os campos devem ser preenchidos!`;
            setErrors(newErrors);
            return;
        } else if (user.password != user.confirmPassword) {
            newErrors.confirmPassword = `A senha e confirmação não coincidem!`;
            setErrors(newErrors);
            return;
        }
        const confirm = window.confirm("Tem certeza de que deseja editar as informações deste usuário?");
        if (!confirm) {
            return;
        } else {
            await axios
            .put("http://localhost:8800/users/" + loggedInUser.id, {
                username: user.username,
                email: user.email,
                password: user.password
            })
            .then(({ data }) => {
                localStorage.setItem('loggedInUser', loggedUser);
                navigate('/dashboard');
            })
            .catch(({ data }) => {
                setErrors({geral: 'Erro ao atualizar personagem ${JSON.stringify(data)}!'});
            });
        }
        setErrors(newErrors);
    };

  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>

        <label>
            Nome do Usuário:
            <input className='edit-input' type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>
        {errors.username && <span className='form-error'>{errors.username}</span>}

        <label>
            E-mail
            <input className='edit-input' type="email" name="email" placeholder="Insira um email válido" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>
        {errors.email && <span className='form-error'>{errors.email}</span>}

        <label>
            Senha:
            <label className='edit-input password'>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Crie uma senha" onChange={handleChange} value={user.password} autoComplete='off' required/>
                <button className='show-button' type='button' onClick={() => setShowPassword(prevState => !prevState)} value={showPassword}>{showPassword ? <IoEye/> : <IoEyeOff/>}</button>
            </label>
        </label>
        {errors.password && <span className='form-error'>{errors.password}</span>}

        <label>
            Confirmar Senha:
            <input className='edit-input' type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirme a senha" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>
        {errors.confirmPassword && <span className='form-error'>{errors.confirmPassword}</span>}

        {errors.geral && <span className='form-error'>{errors.geral}</span>}

        <button className='profile-edit-button' type="submit">Editar usuário</button>

    </form>
  );
}

export default Form;