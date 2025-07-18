import { useState } from 'react';
import { toast } from 'react-toastify';
import { getToken, clearAuthData } from '../../utils/auth.js';
import api from '../../services/api.js';

const useDeleteUser = () => {
    const [ errors, setErrors ] = useState('');
    const token = getToken();

    const deleteUser = async (userId) => {
        try {
            await api.delete(
                `/users/${userId}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            clearAuthData();
            return true;
        } catch (err) {
            toast.error(`Erro ao deletar usuário: ${JSON.stringify(err.response?.data || err.message)}`);
            setErrors(`Erro ao deletar usuário: ${JSON.stringify(err.response?.data || err.message)}`);
            return false;
        }
    };

    return { deleteUser, errors };
};

export default useDeleteUser;