import '../../Styles/components/modal.css';

const ModalConfirm = ({ isOpen, title, message, onConfirm, onCancel }) => {

  // SE O MODAL ESTIVER FECHADO NÃO EXIBE NADA.
  if (!isOpen) return null;

  return (
    <div className="content-modal">
      <div className="modal">

        <h2 className="title">{title}</h2>
        <p className="text">{message}</p>

        <div className="flex justify-end space-x-3">
          <button className="modal-btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="modal-btn" onClick={onConfirm}>
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalConfirm;