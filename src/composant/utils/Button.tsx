import React from 'react';
import '../../styles/utils/Button.css'; // Importez le fichier CSS pour les styles du bouton

interface ButtonProps {
    title: string;
    onClick?: () => void;
    type?: 'primary' | 'secondary'; // Le type du bouton, par défaut 'button'
}

const Button: React.FC<ButtonProps> = ({ title, onClick, type = 'primary' }) => {
    return (
        <button
            className={`button ${type === 'primary' ? 'primary' : 'secondary'}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;
