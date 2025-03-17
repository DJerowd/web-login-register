import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserById = () => {
    const [ users, setUsers ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);
    const [ userId, setUserId ] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const res = await axios.get(`http://localhost:8800/users/` + userId);
                setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                setErrors('Erro ao carregar usuários');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList]);

    return { users, setUpdateList, loading, errors, setUserId };
};

export default useUserById;