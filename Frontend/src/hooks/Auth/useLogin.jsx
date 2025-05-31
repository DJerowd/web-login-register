import { useState } from 'react';
import axios from 'axios';

const URL = "http://localhost:8800";

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setErrors(null);
        try {
            const res = await axios.post(`${URL}/users/login`, { email, password });
            return res.data;
        } catch (err) {
            setErrors(err.response?.data || `Erro ao fazer login`);
            return;
        } finally {
            setLoading(false);
        }
    };
    console.log(login);

    return { login, loading, errors };
};

export default useLogin;