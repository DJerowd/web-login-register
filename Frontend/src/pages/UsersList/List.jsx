import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

function List({ users }) {
    const navigate = useNavigate();

    // DIRECIONA PARA A PAGINA DE DETALHES DO USUÁRIO SELECIONADO.
    const handleUserDetails = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <ul>
            <tr>
                <th> </th>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
            </tr>
            {users.map((user, index) => (
            <tr key={user.id} onClick={() => handleUserDetails(user.id)}>
                <th>{index + 1}</th>
                <th>{`${user.id}`}</th>
                <th>{`${user.username}`}</th>
                <th>{`${user.email}`}</th>
            </tr>
            ))}
        </ul>
    );
}
    
export default List;
