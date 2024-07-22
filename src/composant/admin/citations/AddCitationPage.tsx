import React, {useState} from 'react';
import citationApiService from "../../../service/CitationApiService";
import {Citation} from "../../../models/Citation";
import "../../../styles/composants/admin/citations/AddCitationPage.css"
import HeaderPage from "../../utils/HeaderPage";

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
        const newCitation: Citation = {id: null, texte: texte, auteur: auteur}
        citationApiService.addCitation(newCitation);
        // Réinitialisation des champs après la soumission
        setTexte('');
        setAuteur('');
    };

    return (
        <div className="add-citation-container">
            <HeaderPage title={"Ajouter une citation"} backLink={"/admin"} />
            <form onSubmit={handleSubmit} className="add-citation-form">
                <div className="form-group">
                    <label>Texte de la Citation:</label>
                    <textarea value={texte} onChange={handleTextChange} rows={4} cols={50} required/>
                </div>
                <div className="form-group">
                    <label>Auteur:</label>
                    <input type="text" value={auteur} onChange={handleAuteurChange} required/>
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddCitationPage;
