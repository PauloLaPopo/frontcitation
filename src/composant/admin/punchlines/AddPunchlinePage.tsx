import React, {useState} from "react";
import HeaderPage from "../../utils/HeaderPage";
import {Punchline} from "../../../models/Punchline";
import punchlineApiService from "../../../service/PunchlineApiService";
import "../../../styles/composants/admin/punchlines/AddPunchlinePage.css";

const AddPunchlinePage: React.FC = () => {
    const [punchline, setPunchline] = useState<string>('');
    const [auteur, setAuteur] = useState<string>('');
    const [titre, setTitre] = useState<string>('');


    const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitre(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPunchline(event.target.value);
    };

    const handleAuteurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuteur(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPunchline: Punchline = { id: null, titre: titre, punchline: punchline, auteur: auteur };
        punchlineApiService.addPunchline(newPunchline);
        // Réinitialisation des champs après la soumission
        setTitre('');
        setPunchline('');
        setAuteur('');
    }

    return (
        <div className="add-punchline-container">
            <HeaderPage title={"Ajouter une punchline"} backLink={"/admin"} />
            <form onSubmit={handleSubmit} className="add-punchline-form">
                <div className="form-group">
                    <label>Titre de la Punchline:</label>
                    <input type="text" value={titre} onChange={handleTitreChange} required />
                </div>
                <div className="form-group">
                    <label>Texte de la Punchline:</label>
                    <textarea value={punchline} onChange={handleTextChange} rows={4} cols={50} required />
                </div>
                <div className="form-group">
                    <label>Auteur:</label>
                    <input type="text" value={auteur} onChange={handleAuteurChange} required />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default AddPunchlinePage;