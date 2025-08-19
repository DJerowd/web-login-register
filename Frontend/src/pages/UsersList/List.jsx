import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const List = React.memo(function List({ users, currentPage, itemsPerPage }) {
    const navigate = useNavigate();

    return (
        <table className='users-table'>
            <th>
                <td>USUÁRIOS</td>
            </th>
            {users.map((user, index) => (
            <tr key={user.id} title={`Ver perfil de ${user.username}`} onClick={() => navigate(`/profile/${user.id}`)}>
                <td> 
                    <span id='user-index'>{(currentPage - 1) * itemsPerPage + index + 1} </span> 
                </td>
                <td id='user-image'>
                    <div className='avatar-container-list'>
                        <img
                            className='avatar-image'
                            // src='/assets/avatar.jpg'
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
});

List.propTypes = {
    users: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired
};

export default List;
