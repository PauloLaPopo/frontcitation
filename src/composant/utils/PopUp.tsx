import React from 'react';
import '../../styles/utils/PopUp.css';

interface PopUpProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p>{message}</p>
                <div className="popup-buttons">
                    <button onClick={onConfirm}>Valider</button>
                    <button onClick={onCancel}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
