import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
    const [ users, setUsers ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const res = await axios.get(`http://localhost:8800/users`);
                setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                setErrors(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList]);

    return { users, setUpdateList, loading, errors };
};

export default useUsers;