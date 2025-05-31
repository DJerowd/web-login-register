import { useNavigate } from 'react-router-dom';

function List({ users, currentPage, itemsPerPage }) {
    const navigate = useNavigate();

    // DIRECIONA PARA A PAGINA DE DETALHES DO USUÁRIO SELECIONADO.
    const handleUserDetails = (id) => {
        navigate(`/profile/${id}`);
    };
    
    // OBTÉM OS USUÁRIOS PARA A PÁGINA ATUAL
    const currentUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <table className='users-table'>
            <th>
                <td id='index'> </td>
                <td id='user-id'>ID</td>
                <td id='user-name'>NOME</td>
                <td id='user-email'>EMAIL</td>
            </th>
            {currentUsers.map((user, index) => (
            <tr key={user.id} onClick={() => handleUserDetails(user.id)}>
                <td id='index'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td id='user-id'>{`${user.id}`}</td>
                <td id='user-name'>{`${user.username}`}</td>
                <td id='user-email'>{`${user.email}`}</td>
            </tr>
            ))}
        </table>
    );
}
    
export default List;
