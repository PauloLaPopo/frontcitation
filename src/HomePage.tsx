import React from 'react';
import { Link } from 'react-router-dom';
import './styles/composants/HomePage.css'

const HomePage: React.FC = () => {
    return (
        <div className="HomePage">
            <h1>Bienvenue</h1>
            <div className="button-container">
                <Link to="/citation-du-jour">
                    <button className="nav-button">Citation</button>
                </Link>
                <Link to="/punchline">
                    <button className="nav-button">Punchline</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
