import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth.js';
import axios from 'axios';

const URL = "http://localhost:8800";

const useUserById = () => {
    const [ users, setUsers ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState();
    const [ userId, setUserId ] = useState(null);
    const token = getToken();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors();
            if (userId) {
                try {
                    const res = await axios.get(`${URL}/users/` + userId, { headers: { Authorization: `Bearer ${token}` } });
                    setUsers(res.data);
                } catch (error) {
                    setErrors(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUsers();
    }, [updateList]);

    return { users, setUpdateList, loading, errors, setUserId };
};

export default useUserById;