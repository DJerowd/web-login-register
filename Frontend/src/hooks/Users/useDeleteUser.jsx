import { useState } from 'react';
import { getToken } from '../../utils/auth.js';
import api from '../../services/api.js';

const useDeleteUser = () => {
    const [ errors, setErrors ] = useState('');
    const token = getToken();

    const deleteUser = async (userId) => {
        const confirm = window.confirm("Tem certeza de que deseja excluir o usuário?");
        if (!confirm) {
            return false;
        }
        try {
            await api.delete(
                `/users/${userId}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('token');
            return true;
        } catch (err) {
            setErrors(`Erro ao deletar usuário: ${JSON.stringify(err.response?.data || err.message)}`);
            return false;
        }
    };

    return { deleteUser, errors };
};

export default useDeleteUser;