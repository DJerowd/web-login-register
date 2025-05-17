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
                setUsers(res.data[0]);
            } catch (error) {
                setErrors(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList, userId]);

    return { users, setUpdateList, loading, errors, setUserId };
};

export default useUserById;