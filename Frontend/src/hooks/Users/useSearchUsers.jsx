import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth.js';
import axios from 'axios';

const URL = "http://localhost:8800";

const useSearchUsers = () => {
    const [ users, setUsers ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);
    const [ search, setSearch ] = useState("");
    const token = getToken();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const res = await axios.get(`${URL}/users/search/` + search, { headers: { Authorization: `Bearer ${token}` } });
                setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                if (!search) {
                    const res = await axios.get(`${URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
                    setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
                } else {
                    setUsers([]);
                    setErrors(error.message);
                }
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            }
        };

        fetchUsers();
    }, [updateList]);

    return { users, setUpdateList, loading, errors, search, setSearch };
}

export default useSearchUsers;