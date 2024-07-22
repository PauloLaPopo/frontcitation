import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPage from "../../utils/HeaderPage";
import Loader from '../../utils/Loader';
import PopUp from '../../utils/PopUp';
import RoutesTypes from '../../../models/RoutesTypes';
import '../../../styles/composants/admin/citations/ModifierCitation.css';
import {Citation} from "../../../models/Citation";
import citationApiService from "../../../service/CitationApiService";

const ModifierCitation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [citation, setCitation] = useState<Citation | null>(null);
    const [texte, setTexte] = useState('');
    const [auteur, setAuteur] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch citation by id and set state
        const fetchCitation = async () => {
            // Simulate API call
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setShowPopup(true);
    };

    const handleConfirm = async () => {
        // Update citation logic
        if (citation) {
            const updatedCitation = { ...citation, texte, auteur };
            await citationApiService.updateCitation(updatedCitation);
        }
        navigate(RoutesTypes.LIST_CITATION);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    return (
        <div className="modifier-citation">
            <HeaderPage title={"Modifier la citation"} backLink={RoutesTypes.LIST_CITATION} />
            {citation ? (
                <form onSubmit={handleSubmit} className="form-group">
                    <div>
                        <label>Texte:</label>
                        <input
                            type="text"
                            value={texte}
                            onChange={(e) => setTexte(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Auteur:</label>
                        <input
                            type="text"
                            value={auteur}
                            onChange={(e) => setAuteur(e.target.value)}
                        />
                    </div>
                    <button type="submit">Enregistrer</button>
                </form>
            ) : (
                <Loader />
            )}
            {showPopup && (
                <PopUp
                    message="Êtes-vous sûr de vouloir enregistrer les modifications ?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default ModifierCitation;
