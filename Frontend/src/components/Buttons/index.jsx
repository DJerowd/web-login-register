import { useNavigate } from "react-router-dom";
import { IoPencil, IoArrowBack } from "react-icons/io5";

export function EditButton() {
    const navigate = useNavigate();
    return (
        <button className='action-btn' title="Editar" onClick={() => navigate('/profile/edit')}>
            <IoPencil className="action-icon" />
        </button>
    );
};

export function ReturnButton() {
    const navigate = useNavigate();
    return (
        <button className='action-btn' title="Voltar" onClick={() => navigate(-1)}> 
            <IoArrowBack className='action-icon' /> 
        </button>
    );
};