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
        setErrors(newErrors);

        navigate('/profile');
    };


  return (
    <form onSubmit={handleLogin}>

        <label>
            E-mail
            <input type="email" name="email" onChange={handleChange} value={user.email} required/>
        </label>
        <h6 className='error' >{errors.email}</h6>

        <label>
            Senha
            <input type={"password"}  name="password" onChange={handleChange} value={user.password} required/>
        </label>
        <h6 className='error' >{errors.password} </h6>
        
        <div>
            <button className='signup-button' type='submit'>Fazer login</button>
            <div>
                Não possui conta?
                <Link to="/signup">Criar conta</Link>
            </div>
        </div>

    </form>
  );
}

export default Form;