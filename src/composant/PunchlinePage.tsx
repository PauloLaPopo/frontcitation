import React, { useState, useEffect } from 'react';
import punchlineApiService from "../service/PunchlineApiService";
import { shuffle } from "../utils/Shuffle"; // Fonction utilitaire pour mélanger les options
import Qcm from "./Qcm";
import { Punchline } from "../models/Punchline";
import { Link } from "react-router-dom"; // Composant QCM pour afficher la question et les options
import '../styles/composants/QcmPage.css'
import Loader from "./utils/Loader";
import AnswerFeedback from "./utils/AnswerFeedback";
import Button from "./utils/Button";
import HeaderPage from "./utils/HeaderPage";
import RoutesTypes from "../models/RoutesTypes";

const PunchlinePage: React.FC = () => {
    const [punchlines, setPunchlines] = useState<Punchline[]>([]);
    const [allAuthors, setAllAuthors] = useState<string[]>([]);
    const [currentPunchline, setCurrentPunchline] = useState<Punchline | null>(null);
    const [options, setOptions] = useState<string[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [nbBonneRep, setNbBonneRep] = useState<number>(0);
    const [nbVies, setNbVies] = useState<number>(3);
    const [isPartieEnCours, setIsPartieEnCours] = useState<boolean>(true);
    const [isClueActivated, setIsClueActivated] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean } | null>(null); // État pour l'animation

    const fetchPunchlinesAndAuthors = async () => {
        const [allPunchlines, allAuthors] = await Promise.all([
            punchlineApiService.getAllPunchlines(),
            punchlineApiService.getAllAuthors(),
        ]);
        setPunchlines(allPunchlines);
        setAllAuthors(allAuthors);
        setCurrentPunchline(allPunchlines[0]);
        const otherAuthors = punchlineApiService.getRandomAuthors(allAuthors, allPunchlines[0].auteur, 3);
        setOptions(shuffle([...otherAuthors, allPunchlines[0].auteur]));
    };

    useEffect(() => {
        fetchPunchlinesAndAuthors();
    }, []);

    const handleAnswer = async (isGoodAnswer: boolean) => {
        await setFeedback(null);
        setFeedback({ isCorrect: isGoodAnswer });

        setIsClueActivated(false);

        if (isGoodAnswer) {
            setNbBonneRep(nbBonneRep + 1);
        } else if (nbVies >= 0) {
            setNbVies(nbVies - 1);
            if (nbVies === 0) {
                setIsPartieEnCours(false);
                return;
            }
        }

        const nextIndex = currentIndex + 1;
        if (nextIndex < punchlines.length) {
            setCurrentIndex(nextIndex);
            const nextPunchline = punchlines[nextIndex];
            setCurrentPunchline(nextPunchline);
            const otherAuthors = punchlineApiService.getRandomAuthors(allAuthors, nextPunchline.auteur, 3);
            setOptions(shuffle([...otherAuthors, nextPunchline.auteur]));
        } else {
            console.log('Fin du jeu !');
        }
    };

    const reset = async () => {
        setCurrentPunchline(null);
        setOptions(null);
        setIsPartieEnCours(true);
        setNbVies(3);
        setNbBonneRep(0);
        setFeedback(null);
        await fetchPunchlinesAndAuthors(); // Recharge une nouvelle citation
    };

    const clueButton = () => {
        if (currentPunchline) {
            if (isClueActivated) {
                return (
                    <div>Indice : {currentPunchline.titre}</div>
                )
            } else {
                return (
                    <Button title={"Indice ?"} onClick={() => setIsClueActivated(true)} type={"secondary"} />
                )
            }
        }
        return null;
    }

    return (
        <div className="qcm_page">
            <HeaderPage title={"Qui a dit ça ?"} backLink={RoutesTypes.HOME} />
            {feedback && <AnswerFeedback isCorrect={feedback.isCorrect} onAnimationEnd={() => {}} />}
            {isPartieEnCours ? (
                <>
                    {currentPunchline && options ? (
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
                        <Loader />
                    )}
                </>
            ) : (
                <div className="game-over">
                    <p>Perdu !</p>
                    <Button title="Rejouer ?" onClick={reset} />
                </div>
            )}
        </div>
    );
};

export default PunchlinePage;
