import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import RoutesTypes from "../../../models/RoutesTypes";
import HeaderPage from "../../utils/HeaderPage";
import Loader from "../../utils/Loader";
import PopUp from "../../utils/PopUp";
import {Punchline} from "../../../models/Punchline";
import punchlineApiService from "../../../service/PunchlineApiService";
import "../../../styles/composants/admin/punchlines/ModifierPunchline.css";

const ModifierPunchline: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [punchline, setPunchline] = useState<Punchline | null>(null);
    const [texte, setTexte] = useState<string>('');
    const [auteur, setAuteur] = useState<string>('');
    const [titre, setTitre] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch citation by id and set state
        const fetchPunchline = async () => {
            // Simulate API call
            if (id) {
                const fetchedPunchline = await punchlineApiService.getPunchlineById(id);
                if (fetchedPunchline) {
                    setPunchline(fetchedPunchline);
                    setTexte(fetchedPunchline.punchline);
                    setAuteur(fetchedPunchline.auteur);
                }
            }
        };
        fetchPunchline();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setShowPopup(true);
    };

    const handleConfirm = async () => {
        // Update citation logic
        if (punchline) {
            const updatedPunchline = { ...punchline, texte, auteur };
            await punchlineApiService.updatePunchline(updatedPunchline);
        }
        navigate(RoutesTypes.LIST_PUNCHLINE);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    return (
        <div className="modifier-punchline">
            <HeaderPage title="Modifier la punchline" backLink={RoutesTypes.LIST_PUNCHLINE} />
            {punchline ? (
                <form onSubmit={handleSubmit} className="form-group">
                    <div>
                        <label>Punchline :</label>
                        <input
                            type="text"
                            value={texte}
                            onChange={(e) => setTexte(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Auteur :</label>
                        <input
                            type="text"
                            value={auteur}
                            onChange={(e) => setAuteur(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Titre :</label>
                        <input
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
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

export default ModifierPunchline;