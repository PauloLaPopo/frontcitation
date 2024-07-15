import React from 'react';
import '../../styles/utils/Loader.css'; // Importer le fichier de style CSS pour le Loader

const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
