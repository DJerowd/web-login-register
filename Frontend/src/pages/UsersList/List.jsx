import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

function List({ users, currentPage, setCurrentPage, itemsPerPage }) {
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
        <ul>
            <tr>
                <th> </th>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
            </tr>
            {currentUsers.map((user, index) => (
            <tr key={user.id} onClick={() => handleUserDetails(user.id)}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <th>{`${user.id}`}</th>
                <th>{`${user.username}`}</th>
                <th>{`${user.email}`}</th>
            </tr>
            ))}

            {/* {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} >
                        Anterior
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={currentPage === pageNum ? 'active' : ''}
                        >
                            {pageNum}
                        </button>
                    ))}
                    
                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} >
                        Próximo
                    </button>
                </div>
            )} */}
        </ul>
    );
}
    
export default List;
