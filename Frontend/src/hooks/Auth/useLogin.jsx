import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState('');

    const login = async (email, password) => {
        setLoading(true);
        setErrors('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/users/login`, { email, password });
            return res.data;
        } catch (err) {
            setErrors(`${err.response?.data.message}` || `Erro ao fazer login`);
            return;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, errors };
};

export default useLogin;