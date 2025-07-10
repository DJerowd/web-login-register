import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState('');

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post(
                `/users/login`, 
                { email, password }
            );
            toast(`Sucesso ao fazer login!`);
            localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
            localStorage.setItem('token', JSON.stringify(res.data.token));
            return res.data;
        } catch (err) {
            toast.error(`${err.response?.data.message}` || `Erro ao fazer login`);
            setErrors(`${err.response?.data.message}` || `Erro ao fazer login`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, errors };
};

export default useLogin;