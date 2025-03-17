import { useState, useEffect } from 'react';
import axios from 'axios';

const useSearchUsers = () => {
    const [ users, setUsers ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);
    const [ search, setSearch ] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const res = await axios.get(`http://localhost:8800/users/search/` + search);
                setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                if (!search) {
                    const res = await axios.get(`http://localhost:8800/users`);
                    setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
                } else {
                    setUsers([]);
                }
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList]);

    return { users, setUpdateList, loading, errors, search, setSearch };
}

export default useSearchUsers;