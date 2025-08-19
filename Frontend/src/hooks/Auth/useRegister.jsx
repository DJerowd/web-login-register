import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const useRegister = () => {
    const [ errors, setErrors ] = useState('');

    const register = async (user) => {
        setErrors('');
        if (!user.username || !user.email || !user.password || !user.confirmPassword) {
            setErrors('Todos os campos devem ser preenchidos!');
            return false;
        }
        if (user.password !== user.confirmPassword) {
            setErrors('A senha e confirmação não coincidem!');
            return false;
        }
        try {
            const { data } = await api.post(
                `/users`, 
                { username: user.username, email: user.email, password: user.password }
            );
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
                setErrors(data.message);
            }
            return data;
        } catch (error) {
            const msg = error.response?.data?.message || 'Erro ao criar usuário';
            toast.error(msg);
            setErrors(msg);
            return false;
        }
    };

    return { register, errors };
};

export default useRegister;