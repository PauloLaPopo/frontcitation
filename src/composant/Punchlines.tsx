import React, {useState, useEffect} from 'react';
import punchlineApiService from "../service/PunchlineApiService";
import {shuffle} from "../utils/Shuffle"; // Fonction utilitaire pour mélanger les options
import Qcm from "./Qcm";
import {Punchline} from "../models/Punchline";
import {Link} from "react-router-dom"; // Composant QCM pour afficher la question et les options
import '../styles/composants/Punchline.css'
import Loader from "./utils/Loader";

const Punchlines: React.FC = () => {
    const [punchlines, setPunchlines] = useState<Punchline[]>([]);
    const [currentPunchline, setCurrentPunchline] = useState<Punchline | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [nbBonneRep, setNbBonneRep] = useState<number>(0);
    const [nbVies, setNbVies] = useState<number>(3);
    const [isPartieEnCours, setIsPartieEnCours] = useState<boolean>(true);
    const [isClueActivated, setIsClueActivated] = useState<boolean>(false);


    const fetchPunchlines = async () => {
        const allPunchlines = await punchlineApiService.getAllPunchlines();
        setPunchlines(allPunchlines);
        setCurrentPunchline(allPunchlines[0]);
        const otherAuthors = await punchlineApiService.getDifferentAuthors(allPunchlines[0].auteur);
        if (otherAuthors) {
            setOptions(shuffle([...otherAuthors, allPunchlines[0].auteur]));
        }
    };
    useEffect(() => {
        fetchPunchlines();
    }, []);

    const handleAnswer = async (isGoodAnswer: boolean) => {
        setIsClueActivated(false);
        if (isGoodAnswer) {
            setNbBonneRep(nbBonneRep + 1);
        } else if (nbVies >= 0) {
            setNbVies(nbVies - 1);
            if (nbVies === 0) {
                setIsPartieEnCours(false);
            }
        }
        const nextIndex = currentIndex + 1;
        if (nextIndex < punchlines.length) {
            setCurrentIndex(nextIndex);
            const nextPunchline = punchlines[nextIndex];
            setCurrentPunchline(nextPunchline);
            const otherAuthors = await punchlineApiService.getDifferentAuthors(nextPunchline.auteur);
            if (otherAuthors) {
                setOptions(shuffle([...otherAuthors, nextPunchline.auteur]));
            }
        } else {
            console.log('Fin du jeu !');
            // Gérer la fin du jeu (par exemple, réinitialiser le jeu ou afficher un message)
        }
    };

    const reset = async () => {
        setIsPartieEnCours(true);
        setNbVies(3);
        setNbBonneRep(0);
        await fetchPunchlines(); // Recharge une nouvelle citation
    };

    const clueButton = () => {
        if (currentPunchline) {
            if (isClueActivated) {
                return (
                    <div>Indice : {currentPunchline.titre}</div>
                )
            } else {
                return (
                    <button className={"clue-button"} onClick={() => setIsClueActivated(true)}>Indice ?</button>
                )
            }
        }
        return null;
    }

    return (
        <div className="Punchline">
            {isPartieEnCours ? (
                <>
                    <Link to="/" className="back-link">
                        <span className="arrow-left">&#x2190;</span> {/* Flèche vers la gauche */}
                        <span className="back-text">Retour</span>
                    </Link>
                    <h1>Qui a dit ça ?</h1>
                    {currentPunchline ? (
                        <div>
                            <Qcm
                                texte={currentPunchline.punchline}
                                auteur={currentPunchline.auteur}
                                options={options}
                                fetchDifferentCitation={handleAnswer}
                            />
                            <div className="game-info">
                                <p>Streak : {nbBonneRep}</p>
                                <p>Nombre de vies : {nbVies}</p>
                                {clueButton()}
                            </div>

                        </div>
                    ) : (
                        <Loader/>
                    )}
                </>
            ) : (
                <div className="game-over">
                    <p>Perdu !</p>
                    <button onClick={reset}>Rejouer ?</button>
                </div>
            )}
        </div>
    );
};

export default Punchlines;
