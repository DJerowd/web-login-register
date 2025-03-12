import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [updateUserList, setUpdateUserList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await axios.get(`http://localhost:8800/users`);
    //             setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
    //         } catch (error) {
    //             toast.error(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUsers();
    // }, [updateUserList]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const res = await axios.get(`http://localhost:8800/users`);

                const timer = setTimeout(() => {
                    setUsers(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
                    setLoading(false);
                  }, 1000);
                  return () => clearTimeout(timer);

            } catch (error) {
                setErrors('Erro ao carregar usuários');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateUserList]);

    return { users, setUpdateUserList, loading, errors };
};

export default useUsers;