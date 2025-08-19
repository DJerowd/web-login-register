import { useState } from 'react';
import api from '../../services/api';
import { useError } from '../../hooks/useError';

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState('');
    const { showError, showSuccess } = useError();

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post(
                '/users/login',
                { email, password }
            );
            if (res.data.success) {
                showSuccess(res.data.message);
                localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user));
                localStorage.setItem('token', JSON.stringify(res.data.data.token));
            } else {
                showError(res.data.message);
                setErrors(res.data.message);
            }
            return res.data;
        } catch (error) {
            const msg = error.response?.data?.message || 'Erro ao fazer login';
            showError(msg);
            setErrors(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, errors };
};

export default useLogin;