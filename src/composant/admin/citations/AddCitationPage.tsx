import React, { useState } from 'react';
import {Link} from "react-router-dom";
import citationApiService from "../../../service/CitationApiService";
import {Citation} from "../../../models/Citation";

const AddCitationPage: React.FC = () => {
    const [texte, setTexte] = useState<string>('');
    const [auteur, setAuteur] = useState<string>('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTexte(event.target.value);
    };

    const handleAuteurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuteur(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCitation: Citation = {id: null,texte: texte, auteur: auteur}
        citationApiService.addCitation(newCitation);
        // Réinitialisation des champs après la soumission
        setTexte('');
        setAuteur('');
    };

    return (
        <div className="AddCitation">
            <Link to="/admin" className="back-link">
                <span className="arrow-left">&#x2190;</span> {/* Flèche vers la gauche */}
                <span className="back-text">Retour</span>
            </Link>
            <h2>Ajouter une Citation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Texte de la Citation:</label>
                    <textarea value={texte} onChange={handleTextChange} rows={4} cols={50} required />
                </div>
                <div>
                    <label>Auteur:</label>
                    <input type="text" value={auteur} onChange={handleAuteurChange} required />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddCitationPage;
