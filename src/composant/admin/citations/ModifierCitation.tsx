import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import citationApiService from '../../../service/CitationApiService';
import { Citation } from '../../../models/Citation';
import '../../../styles/composants/admin/citations/ModifierCitation.css';
import Loader from "../../utils/Loader";

const ModifierCitation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [citation, setCitation] = useState<Citation | null>(null);
    const [texte, setTexte] = useState<string>('');
    const [auteur, setAuteur] = useState<string>('');

    useEffect(() => {
        const fetchCitation = async () => {
            if (id) {
                const fetchedCitation = await citationApiService.getCitationById(id);
                if (fetchedCitation) {
                    setCitation(fetchedCitation);
                    setTexte(fetchedCitation.texte);
                    setAuteur(fetchedCitation.auteur);
                }
            }
        };

        fetchCitation();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (citation) {
            const updatedCitation = { ...citation, texte, auteur };
            await citationApiService.updateCitation(updatedCitation);
            navigate('/');
        }
    };

    return (
        <div className="modifier-citation">
            <h1>Modifier Citation</h1>
            {citation ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Texte:</label>
                        <input type="text" value={texte} onChange={(e) => setTexte(e.target.value)} />
                    </div>
                    <div>
                        <label>Auteur:</label>
                        <input type="text" value={auteur} onChange={(e) => setAuteur(e.target.value)} />
                    </div>
                    <button type="submit">Enregistrer</button>
                </form>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default ModifierCitation;
