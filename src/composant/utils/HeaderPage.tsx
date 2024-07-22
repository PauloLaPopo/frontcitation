import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/utils/HeaderPage.css';

interface HeaderPageProps {
    title: string;
    backLink: string;
}

const HeaderPage: React.FC<HeaderPageProps> = ({ title, backLink }) => {
    return (
        <header className="header-page">
            <Link to={backLink} className="back-link">
                <span className="arrow-left">&#x2190;</span> {/* Flèche vers la gauche */}
                <span className="back-text">Retour</span>
            </Link>
            <h1 className="header-title">{title}</h1>
        </header>
    );
};

export default HeaderPage;
