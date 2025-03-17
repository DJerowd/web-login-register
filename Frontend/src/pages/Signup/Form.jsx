import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Form({ users, setUpdateUserList }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '', geral: '' });

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
        } else if ( user.confirmPassword != user.password ) {
            newErrors.confirmPassword = `A senha e confirmação não coincidem!`;
        } else {
            await axios
            .post("http://localhost:8800/users", {
                username: user.username,
                email: user.email,
                password: user.password
        })
            .then(({ data }) => {
                setUpdateCharacterList(prevState => !prevState);
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
        setUpdateUserList(prevState => !prevState);
        setErrors(newErrors);
        navigate('/login');
    };


  return (
    <form onSubmit={handleSignup}>

        <label>
            Nome de Usuário:
            <input type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChange} value={user.username} autoComplete='off' required/>
        </label>
        <h4 className='error' >{errors.username}</h4>

        <label>
            E-mail
            <input type="email" name="email" placeholder="Insira um email válido" onChange={handleChange} value={user.email} autoComplete='off' required/>
        </label>
        <h4 className='error' >{errors.email}</h4>

        <label>
            Senha
            <input type="password" name="password" placeholder="Crie uma senha" onChange={handleChange} value={user.password} autoComplete='off' required/>
        </label>
        <h4 className='error' >{errors.password}</h4>

        <label>
            Confirmar Senha:
            <input type="Password" name="confirmPassword" placeholder="Confirme a senha" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
        </label>
        <h4 className='error' >{errors.confirmPassword}</h4>
        
        <div>
        <h4 className='error' >{errors.geral}</h4>
            <button className='signup-btn' type='submit'>Criar conta</button>
            <div>
                Já possui uma conta?
                <Link to="/login">Entre aqui</Link>
            </div>
        </div>

    </form>
  );
}

export default Form;