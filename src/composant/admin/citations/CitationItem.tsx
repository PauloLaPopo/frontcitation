import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Citation } from '../../../models/Citation';
import '../../../styles/composants/admin/citations/CitationItem.css';
import RoutesTypes from "../../../models/RoutesTypes";
import Button from "../../utils/Button";
import PopUp from "../../utils/PopUp";
import citationApiService from "../../../service/CitationApiService"; // Assurez-vous que le chemin est correct

interface CitationItemProps {
    index: number;
    citation: Citation;
    onDelete: (id: string) => void;
}

const CitationItem: React.FC<CitationItemProps> = ({ index, citation, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = () => {
        setShowPopup(true);
    };

    const handleConfirmDelete = async () => {
        if (citation.id) {
            await citationApiService.deleteCitation(citation.id);
            onDelete(citation.id);
            setShowPopup(false);
        }
    };

    const handleCancelDelete = () => {
        setShowPopup(false);
    };

    return (
        <div className="citation-item">
            <p>{index} - {citation.texte} - {citation.auteur}</p>
            <Link to={`${RoutesTypes.UPDATE_CITATION}/${citation.id}`}>
                <Button title="Modifier" type="primary" />
            </Link>
            <Button title="Supprimer" type="secondary" onClick={handleDelete} />
            {showPopup && (
                <PopUp
                    message="Êtes-vous sûr de vouloir supprimer cette citation ?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default CitationItem;
