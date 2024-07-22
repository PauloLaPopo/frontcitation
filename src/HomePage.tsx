import React from 'react';
import { Link } from 'react-router-dom';
import './styles/composants/HomePage.css'
import Button from "./composant/utils/Button";
import RoutesTypes from "./models/RoutesTypes";

const HomePage: React.FC = () => {
    return (
        <div className="HomePage">
            <h1>Bienvenue</h1>
            <div className="button-container">
                <Link to={RoutesTypes.CITATION}>
                    <Button title={"Citation"} />
                </Link>
                <Link to={RoutesTypes.PUNCHLINE}>
                    <Button title={"Punchline"}/>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
