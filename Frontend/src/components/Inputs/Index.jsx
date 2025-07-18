import { IoSearch } from "react-icons/io5";
import PropTypes from 'prop-types';
import '../../Styles/components/inputs.css';

export function SearchInput({ value, onChange, onSearch, placeholder = "Pesquisar...", disabled = false, ...rest }) {
    
    return (
        <label className='search-input'>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onSearch();
                }}
                disabled={disabled}
                {...rest}
            />
            <button 
                className='icon'
                onClick={onSearch}
                disabled={disabled}
                {...rest}
                aria-label="Pesquisar"
            >
                <IoSearch/>
            </button>
        </label>
    );
};

SearchInput.propTypes = {
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node
};