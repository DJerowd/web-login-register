import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth.js';
import axios from 'axios';


const useSearchUsers = () => {
    const [ users, setUsers ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState('');
    const [ search, setSearch ] = useState('');
    const token = getToken();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors('');
            try {
                if (!search) {
                    const res = await axios.get(`${import.meta.env.VITE_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
                    setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
                } else {
                    const res = await axios.get(`${import.meta.env.VITE_URL}/users/search/` + search, { headers: { Authorization: `Bearer ${token}` } });
                    setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
                }
                return true;
            } catch (err) {
                setUsers([]);
                setErrors(`${err.response?.data.message || err.message}`);
                return false;
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList]);

    return { users, setUpdateList, loading, errors, search, setSearch };
}

export default useSearchUsers;