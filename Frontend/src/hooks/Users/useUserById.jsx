import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '../../utils/auth.js';
import api from '../../services/api.js';

const useUserById = (userId = null) => {
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState(null);
    const token = getToken();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            if (userId) {
                try {
                    const res = await api.get(
                        `/users/` + userId, 
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (res.data.success) {
                        setUsers(res.data.data);
                    } else {
                        toast.error(res.data.message);
                        setErrors(res.data.message);
                    }
                    return true;
                } catch (error) {
                    const msg = error.response?.data?.message || error.message;
                    toast.error(msg);
                    setErrors(msg);
                    return false;
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUsers();
    }, [token, userId]);

    return { users, loading, errors };
};

export default useUserById;