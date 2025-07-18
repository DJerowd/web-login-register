import PropTypes from 'prop-types';
import '../../Styles/components/modal.css'

export function ConfirmModal({ title, isOpen, onConfirm, onCancel }) {

  if (!isOpen) return null;

    return (
        <div className="content-modal">
            <div className="modal">
                <h2 className="title">{title}</h2>
                <div className="modal-btn-bar">
                    <button onClick={onCancel} className="modal-btn">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="modal-btn confirm">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};