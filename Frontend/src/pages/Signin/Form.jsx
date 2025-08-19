import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from '../../components/Inputs/InputField';
import ErrorMessage from '../../components/Inputs/ErrorMessage';

export default function Form({ login, errors }) {
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
        navigate('/dashboard');
    };


  return (
    <form className='sign-form' onSubmit={handleLogin}>

        <InputField
            label="E-mail:"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
        />

        <InputField
            label="Senha:"
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            showPassword={showPassword}
            setShowPassword={setShowPassword}
        />
        
        {errors && <ErrorMessage message={errors} />}
        
        <button className='sign-btn' type='submit'>Entrar</button>

        <div>
            Não possui conta?
            <Link className='link' to="/signup">Criar conta</Link>
        </div>

    </form>
  );
};

Form.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.string.isRequired
};