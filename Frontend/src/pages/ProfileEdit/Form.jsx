import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";

import ConfirmModal from '../../components/Modal/ConfirmModal.jsx';

function Form({edit, errors, loggedInUser}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ id: loggedInUser.id, username: loggedInUser.username, email: loggedInUser.email, password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        setModalOpen(false);
        const success = await edit(user, loggedInUser);
        if (success) {
            navigate('/dashboard');
        }
    };

  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>

        <label>
            Nome do Usuário:
            <input className='edit-input sign-input' type="text" name="username" placeholder="Insira um nome de usuário" onChange={handleChangeData} value={user.username} autoComplete='off' required/>
        </label>

        <label>
            E-mail
            <input className='edit-input sign-input' type="email" name="email" placeholder="Insira um email válido" onChange={handleChangeData} value={user.email} autoComplete='off' required/>
        </label>

        <label>
            Senha:
            <label className='edit-input password sign-input'>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Crie uma senha" onChange={handleChangeData} value={user.password} autoComplete='off' required/>
                <button className='show-btn' type='button' onClick={() => setShowPassword(prevState => !prevState)} value={showPassword}>{showPassword ? <IoEye/> : <IoEyeOff/>}</button>
            </label>
        </label>

        <label>
            Confirmar Senha:
            <input className='edit-input sign-input' type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirme a senha" onChange={handleChangeData} value={user.confirmPassword} autoComplete='off' required/>
        </label>

        {errors && <span className='form-error'>{errors}</span>}

        <button className='sign-btn' type="submit">Salvar Alterações</button>
        
        <ConfirmModal
            title="Deseja salvar as alterações do perfil?"
            isOpen={modalOpen}
            onConfirm={handleConfirm}
            onCancel={() => { setModalOpen(false) }}
        />
    </form>
  );
}

export default Form;