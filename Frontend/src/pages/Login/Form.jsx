import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Form({users}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    // FUNÇÃO PARA ALTERAR DADOS DO FORMULÁRIO.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    // FUNÇÃO PARA REALIZAR O LOGIN DE USUÁRIO.
    const handleLogin = (e) => {
        e.preventDefault();

        let newErrors = { email: '', password: '' };
        const foundUser = users.find(u => u.email === user.email);
        if (!foundUser) {
            newErrors.email = 'E-mail não encontrado';
            setErrors(newErrors);
            return;
        }
        if (foundUser.password !== user.password) {
            newErrors.password = 'Senha incorreta';
            setErrors(newErrors);
            return;
        }
        const loggedInUser = JSON.stringify({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            password: foundUser.password
        });
        localStorage.setItem('loggedInUser', loggedInUser);

        setErrors(newErrors);
        navigate('/dashboard');
    };


  return (
    <form onSubmit={handleLogin}>

        <label>
            E-mail
            <input type="email" name="email" onChange={handleChange} value={user.email} required/>
        </label>
        <h4 className='error' >{errors.email}</h4>

        <label>
            Senha
            <input type={"password"}  name="password" onChange={handleChange} value={user.password} required/>
        </label>
        <h4 className='error' >{errors.password} </h4>
        
        <div>
            <button className='login-btn' type='submit'>Fazer login</button>
            <div>
                Não possui conta?
                <Link to="/signup">Criar conta</Link>
            </div>
        </div>

    </form>
  );
}

export default Form;