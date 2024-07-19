import React from 'react';
import '../styles/composants/Qcm.css'
import Button from "./utils/Button";

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
                    <Button
                        key={index}
                        title={author}
                        onClick={() => fetchDifferentCitation(author === auteur)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Qcm;
