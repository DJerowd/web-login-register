import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <span className='form-error'>{message}</span>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string
}; 