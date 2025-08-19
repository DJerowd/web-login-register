import { useState } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '../../utils/auth.js';
import api from '../../services/api.js';

const useEditUser = () => {
    const [ errors, setErrors ] = useState('');
    const token = getToken();

    const edit = async (user, loggedInUser) => {
        if (!user.username || !user.email || !user.password || !user.confirmPassword) {
            setErrors('Todos os campos devem ser preenchidos!');
            return false;
        }
        if (user.password !== user.confirmPassword) {
            setErrors('A senha e confirmação não coincidem!');
            return false;
        }
        try {
            const loggedUser = JSON.stringify({ id: user.id, username: user.username, email: user.email, password: user.password });
            await api.put(
                `/users/${loggedInUser.id}`, 
                { username: user.username, email: user.email, password: user.password }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.setItem('loggedInUser', loggedUser);
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            toast.error(msg);
            setErrors(msg);
            return false;
        }
    };

    return { edit, errors };
};

export default useEditUser;