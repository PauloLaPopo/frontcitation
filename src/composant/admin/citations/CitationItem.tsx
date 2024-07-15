import React from 'react';
import { Link } from 'react-router-dom';
import { Citation } from '../../../models/Citation';
import '../../../styles/composants/admin/citations/CitationItem.css';

interface CitationItemProps {
    citation: Citation;
}

const CitationItem: React.FC<CitationItemProps> = ({ citation }) => {
    return (
        <div className="citation-item">
            <p>{citation.texte} - {citation.auteur}</p>
            <Link to={`/modifier-citation/${citation.id}`}>
                <button className="edit-button">Modifier</button>
            </Link>
            <Link to={`/supprimer-citation/${citation.id}`}>
                <button className="delete-button">Supprimer</button>
            </Link>
        </div>
    );
};

export default CitationItem;
