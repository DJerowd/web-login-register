import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setErrors(null);
        try {
            const res = await axios.post(`http://localhost:8800/users/login`, { email, password });
            setLoading(false);
            return res.data;
        } catch (err) {
            setErrors(err.response?.data || `Erro ao fazer login`);
            setLoading(false);
            return;
        }
    };
    console.log(login);

    return { login, loading, errors };
};

export default useLogin;