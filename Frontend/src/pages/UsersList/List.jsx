import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";

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
                <td id='user-name'>USUÁRIOS</td>
            </th>
            {currentUsers.map((user, index) => (
            <tr key={user.id} onClick={() => handleUserDetails(user.id)}>
                <td> 
                    <span id='index'>{(currentPage - 1) * itemsPerPage + index + 1} </span> 
                </td>
                <td id='user-image'>
                    <svg className='svg-profile'>
                        <IoPerson />
                    </svg>
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
