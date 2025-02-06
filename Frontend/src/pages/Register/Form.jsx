import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Styles.css';

function Form({ users, setUpdateUserList }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( !user.username || !user.email || !user.password ) {
            toast.warn(`Todos os campos devem ser preenchidos!`);
        } else if ( user.confirmPassword != user.password ) {
            toast.warn(`A senha e confirmação não coincidem!`);
        } else {
            await axios
            .post("http://localhost:8800/users", {
                username: user.username,
                email: user.email,
                password: user.password
        })
            .then(({ data }) => {
                setUpdateCharacterList(prevState => !prevState);
                toast.success(`Personagem ${user.username} | ${user.email} salvo! ${JSON.stringify(data)}`);
        })
            .catch(({ data }) => 
                toast.error(`Erro ao salvar personagem ${JSON.stringify(data)}!`
        ));
            setUser({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/login');
        }
        setUpdateUserList(prevState => !prevState);
    };

    return (
        <form name="form-register" onSubmit={handleSubmit}>
            <label>
                Nome de Usuário:
                <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete='off' required/>
            </label>

            <label>
                E-mail:
                <input type="email" name="email" onChange={handleChange} value={user.email} autoComplete='off' required/>
            </label>

            <label>
                Senha:
                <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete='off' required/>
            </label>

            <label>
                Confirmar Senha:
                <input type="Password" name="confirmPassword" onChange={handleChange} value={user.confirmPassword} autoComplete='off' required/>
            </label>

            <div className='buttonsBox'>
                <button className='btnRegister' type="submit">Criar conta</button>
                <Link to="/login">Já possui uma conta? Faça login</Link>
            </div>
        </form>
  );
}

export default Form;