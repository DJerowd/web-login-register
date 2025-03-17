import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserById = () => {
    const [userById, setUserById] = useState([]);
    const [updateUserByIdList, setUpdateUserByIdList] = useState(false);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const res = await axios.get(`http://localhost:8800/users/` + userId);
                setUserById(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
            } catch (error) {
                setErrors('Erro ao carregar usuários');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateUserByIdList]);

    
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         setLoading(true);
    //         setErrors(null);
    //         try {
    //             const res = await axios.get(`http://localhost:8800/users/` + userId);
    //             const timer = setTimeout(() => {
    //                 setUserById(res.data.sort((a, b) => (a.createDate > b.createDate ? 1 : -1)));
    //                 setLoading(false);
    //               }, 1000);
    //               return () => clearTimeout(timer);
    //         } catch (error) {
    //             setErrors('Erro ao carregar usuários');
    //             setLoading(false);
    //         }
    //     };
    //     fetchUsers();
    // }, [updateUserByIdList]);

    return { userById, setUpdateUserByIdList, setUserId, loading, errors };
};

export default useUserById;