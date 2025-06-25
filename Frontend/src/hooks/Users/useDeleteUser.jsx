import { useState } from 'react';
import { getToken } from '../../utils/auth.js';
import axios from 'axios';

const useDeleteUser = () => {
    const [error, setError] = useState(null);
    const token = getToken();

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_URL}/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('token');
            return true;
        } catch (err) {
            setError(`Erro ao deletar usuário: ${JSON.stringify(err.response?.data || err.message)}`);
            return false;
        }
    };

    return { deleteUser, error };
};

export default useDeleteUser;