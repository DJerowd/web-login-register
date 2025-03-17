import { React, useState } from 'react';
import './Styles.css';

function Pagination({ users, currentPage, setCurrentPage, itemsPerPage }) {

    // CALCULA O TOTAL DE PÁGINAS NECESSÁRIAS
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
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
    );
}
    
export default Pagination;
