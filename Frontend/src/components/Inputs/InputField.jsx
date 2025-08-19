import PropTypes from 'prop-types';

export default function InputField({ label, type, name, value, onChange, required, showPassword, setShowPassword }) {
  const inputId = `input-${name}`;
  return (
    <label htmlFor={inputId}>
      {label}
      <div className={type === 'password' ? 'sign-input password' : 'sign-input'}>
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-label={label}
          aria-required={required}
        />
        {typeof showPassword !== 'undefined' && setShowPassword && (
          <button
            className='show-btn'
            type='button'
            onClick={() => setShowPassword(prev => !prev)}
            value={showPassword}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
    </label>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func
};

InputField.defaultProps = {
  required: false,
  showPassword: false,
  setShowPassword: null
};