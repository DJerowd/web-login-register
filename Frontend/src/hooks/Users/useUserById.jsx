import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth.js';
import api from '../../services/api.js';

const useUserById = () => {
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState('');
    const [ userId, setUserId ] = useState();
    const token = getToken();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors('');
            if (userId) {
                try {
                    const res = await api.get(
                        `/users/` + userId, 
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setUsers(res.data);
                    return true;
                } catch (err) {
                    setErrors(`${err.response?.data.message || err.message}`);
                    return false;
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUsers();
    }, [token, userId]);

    return { users, loading, errors, setUserId };
};

export default useUserById;