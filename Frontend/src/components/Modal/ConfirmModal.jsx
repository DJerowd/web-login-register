import '../../Styles/components/modal.css'

const ConfirmModal = ({ title, isOpen, onConfirm, onCancel }) => {

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

export default ConfirmModal;