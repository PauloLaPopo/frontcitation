import React, { useState } from 'react';
import '../styles/composants/ButtonOption.css'

interface ButtonOptionProps {
    author: string; // Nom de l'auteur affiché sur le bouton
    handleClick: () => void; // Changer handleClick par fetchDifferentCitation
}

const ButtonOption: React.FC<ButtonOptionProps> = ({ author, handleClick }) => {
    return (
        <button className="option-button" onClick={handleClick}>
            {author}
        </button>
    );
};

export default ButtonOption;
