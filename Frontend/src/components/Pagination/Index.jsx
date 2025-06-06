import '../../Styles/components/pagination.css';

function Pagination({ itens, currentPage, setCurrentPage, itemsPerPage }) {

    // CALCULA O TOTAL DE PÁGINAS NECESSÁRIAS
    const totalPages = Math.ceil(itens.length / itemsPerPage);

    return (
        <div className="pagination">
            <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} >
                Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={currentPage === pageNum ? 'active' : ''} >
                    {pageNum}
                </button>
            ))}
            
            <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage >= totalPages} >
                Próximo
            </button>
        </div>
    );
}
    
export default Pagination;
