import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import citationApiService from '../../../service/CitationApiService';
import '../../../styles/composants/admin/citations/SupprimerCitation.css';

const SupprimerCitation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteCitation = async () => {
            if (id) {
                await citationApiService.deleteCitation(id);
                navigate('/');
            }
        };

        deleteCitation();
    }, [id, navigate]);

    return (
        <div className="supprimer-citation">
            <h1>Suppression de la Citation...</h1>
        </div>
    );
};

export default SupprimerCitation;
