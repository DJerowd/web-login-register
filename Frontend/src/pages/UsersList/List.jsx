import { React } from 'react';

import './Styles.css';

function List({ users }) {
    return (
        <ul>
            <tr>
                <th> </th>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
            </tr>
            {users.map((user, index) => (
            <tr key={user.id}>
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
