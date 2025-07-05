import { useState } from 'react';
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
            return res.data;
        } catch (err) {
            setErrors(`${err.response?.data.message}` || `Erro ao fazer login`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, errors };
};

export default useLogin;