import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Styles.css';

function Form({loggedInUser}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ id: loggedInUser.id, username: loggedInUser.username, email: loggedInUser.email, password: loggedInUser.password });
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '', geral: '' });

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
                newErrors.geral = `Erro ao atualizar personagem ${JSON.stringify(data)}!`
            });
        }
        setErrors(newErrors);
    };

  return (
    <form onSubmit={handleSubmit}>

        <label>
            Nome do Usuário:
            <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>

        <label>
            E-mail
            <input type="email" name="email" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>

        <label>
            Senha:
            <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete='off' required/>
        </label>

        <button className='edit-button' type="submit">Editar usuário</button>

    </form>
  );
}

export default Form;