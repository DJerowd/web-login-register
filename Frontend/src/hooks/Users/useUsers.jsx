import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [updateUserList, setUpdateUserList] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/users`);
                setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                toast.error(error);
            }
        };

        fetchUsers();
    }, [updateUserList]);

    return { users, setUpdateUserList };
};

export default useUsers;