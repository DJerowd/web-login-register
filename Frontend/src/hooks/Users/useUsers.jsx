import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth.js';
import api from '../../services/api.js';
import { buildQuery } from '../../utils/buildQuery.js';
import { useError } from '../useError';

const useUsers = (currentPage, filters) => {
    const [ users, setUsers ] = useState([]);
    const [ reload, setReload ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState('');
    const [ totalPages, setTotalPages ] = useState(1);
    const token = getToken();
    const endpoint = buildQuery(currentPage, filters.limitPerPage, filters.username)
    const { showError } = useError();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors('');
            try {
                const res = await api.get(
                    endpoint,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data.success) {
                    setUsers(res.data.data.users.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
                    setTotalPages(res.data.data.totalPages);
                } else {
                    showError(res.data.message);
                    setErrors(res.data.message);
                }
                return true;
            } catch (error) {
                setUsers([]);
                const msg = error.response?.data?.message || error.message;
                showError(msg);
                setErrors(msg);
                return false;
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [reload, token, currentPage, filters.limitPerPage]);

    return { users, setReload, loading, errors, totalPages };
};

export default useUsers;