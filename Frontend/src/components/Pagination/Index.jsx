import PropTypes from 'prop-types';
import '../../Styles/components/pagination.css';  

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const maxVisiblePages = 3;

    const getPageNumbers = () => {
        let pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        let adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
        for (let i = adjustedStartPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };
    const visiblePages = getPageNumbers();

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} >
                ❮
            </button>

            {visiblePages[0] > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {visiblePages[0] > 2 && <span className="ellipsis">
                      ...
                    </span>}
                </>
            )}
            
            {visiblePages.map(pageNum => (
                <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={currentPage === pageNum ? 'active' : ''}
                >
                    {pageNum}
                </button>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="ellipsis">...</span>}
                    <button onClick={() => onPageChange(totalPages)}>
                      {totalPages}
                    </button>
                </>
            )}
            
            <button onClick={() => onPageChange(prev => Math.min(totalPages, prev + 1))} disabled={currentPage >= totalPages} >
                ❯
            </button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
    
