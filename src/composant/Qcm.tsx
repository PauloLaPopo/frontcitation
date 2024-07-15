import React from 'react';
import ButtonOption from './ButtonOption';
import '../styles/composants/Qcm.css'

interface QcmProps {
    texte: string;
    auteur: string;
    options: string[];
    fetchDifferentCitation: (isGoodAnswer: boolean) => void;
}

const Qcm: React.FC<QcmProps> = ({ texte, auteur, options, fetchDifferentCitation }) => {

    const handleClick = (isGoodAnswer: boolean) => {
        fetchDifferentCitation(isGoodAnswer);
    }

    return (
        <div className="Qcm">
            <p>{texte}</p>
            <div id="boutons-auteurs">
                {options.map((author, index) => (
                    <ButtonOption
                        key={index}
                        author={author}
                        handleClick={() => fetchDifferentCitation(author === auteur)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Qcm;
