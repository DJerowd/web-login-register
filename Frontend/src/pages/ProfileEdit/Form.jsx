import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";

function Form({edit, errors, loggedInUser}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ id: loggedInUser.id, username: loggedInUser.username, email: loggedInUser.email, password: '', confirmPassword: '' });
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
        const success = await edit(user, loggedInUser);
        if (success) {
            navigate('/dashboard');
        }
    };

  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>

        <label>
            Nome do Usuário:
            <input className='edit-input' type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>

        <label>
            E-mail
            <input className='edit-input' type="email" name="email" placeholder="Insira um email válido" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>

        <label>
            Senha:
            <label className='edit-input password'>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Crie uma senha" onChange={handleChange} value={user.password} autoComplete='off' required/>
                <button className='show-button' type='button' onClick={() => setShowPassword(prevState => !prevState)} value={showPassword}>{showPassword ? <IoEye/> : <IoEyeOff/>}</button>
            </label>
        </label>

        <label>
            Confirmar Senha:
            <input className='edit-input' type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirme a senha" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>

        {errors && <span className='form-error'>{errors}</span>}

        <button className='profile-edit-button' type="submit">Editar usuário</button>

    </form>
  );
}

export default Form;