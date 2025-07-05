import { useState } from 'react';
import api from '../../services/api.js';

const useRegister = () => {
    const [ errors, setErrors ] = useState('');

    const register = async (user) => {
        setErrors('');
        if (!user.username || !user.email || !user.password || !user.confirmPassword) {
            setErrors(`Todos os campos devem ser preenchidos!`);
            return false;
        }
        if (user.password !== user.confirmPassword) {
            setErrors(`A senha e confirmação não coincidem!`);
            return false;
        }
        try {
            const { data } = await api.post(
                `/users`, 
                { username: user.username, email: user.email, password: user.password }
            );
            setErrors(`${data.message}`);
            return true;
        } catch (err) {
            setErrors(`${err.response?.data.message || err.message}`);
            return false;
        }
    };

    return { register, errors };
};

export default useRegister;