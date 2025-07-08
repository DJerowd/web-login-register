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
                <td>USUÁRIOS</td>
            </th>
            {currentUsers.map((user, index) => (
            <tr key={user.id} onClick={() => handleUserDetails(user.id)}>
                <td> 
                    <span id='user-index'>{(currentPage - 1) * itemsPerPage + index + 1} </span> 
                </td>
                <td id='user-image'>
                    <div className='avatar-container-list'>
                        <img
                            className='avatar-image'
                            src='/assets/avatar.jpg'
                            alt='AV'
                            onError={(e) => {e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${user.username}&rounded=true&background=transparent`; }}
                        />
                    </div>
                </td>
                <td id='user-name'>
                    <span>{`${user.username}`}</span>
                    <span>{`${user.email}`}</span>
                </td>
            </tr>
            ))}
        </table>
    );
}
    
export default List;
