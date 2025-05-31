import { useNavigate } from "react-router-dom";
import { IoPencil, IoArrowBack } from "react-icons/io5";

export function EditButton() {
    const navigate = useNavigate();
    return (
        <button className='edit-btn' title="Editar" onClick={() => navigate('/profile/edit')}>
            <IoPencil className="edit-icon" />
        </button>
    );
};

export function ReturnButton() {
    const navigate = useNavigate();
    return (
        <button className='return-btn' title="Voltar" onClick={() => navigate(-1)}> 
            <IoArrowBack className='return-icon' /> 
        </button>
    );
};