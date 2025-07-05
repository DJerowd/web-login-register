import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth.js';
import api from '../../services/api.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState('');
    const token = getToken();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors('');
            try {
                const res = await api.get(
                    `/users`, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                setErrors(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList, token]);  // Incluído token nas dependências, caso ele mude

    return { users, setUpdateList, loading, errors };
};

export default useUsers;
