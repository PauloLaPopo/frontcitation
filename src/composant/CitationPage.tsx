import React, {useState, useEffect} from 'react';
import {Citation} from '../models/Citation';
import citationApiService from "../service/CitationApiService";
import {shuffle} from "../utils/Shuffle";
import {Link} from "react-router-dom";
import Qcm from "./Qcm";
import Loader from "./utils/Loader";
import AnswerFeedback from "./utils/AnswerFeedback";
import '../styles/composants/QcmPage.css'
import Button from "./utils/Button";
import HeaderPage from "./utils/HeaderPage";
import RoutesTypes from "../models/RoutesTypes";

const CitationPage: React.FC = () => {
    const [citation, setCitation] = useState<Citation | null>(null);
    const [options, setOptions] = useState<string[]>([]); // Initialisé avec un tableau vide
    const [nbBonneRep, setNbBonneRep] = useState<number>(0);
    const [nbVies, setNbVies] = useState<number>(3);
    const [isPartieEnCours, setIsPartieEnCours] = useState<boolean>(true);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean } | null>(null); // État pour l'animation


    const fetchCitationDuJour = async () => {
        const citationDuJour = await citationApiService.getCitation();
        setCitation(citationDuJour);
        if (citationDuJour) {
            const allAuthors = await citationApiService.getDifferentAuthors(citationDuJour.auteur);
            if (allAuthors) {
                const shuffledOptions = shuffle([...allAuthors, citationDuJour.auteur]);
                setOptions(shuffledOptions);
            }
        }
    };

    useEffect(() => {
        fetchCitationDuJour();
    }, []);

    const handleAnswer = async (isGoodAnswer: boolean) => {
        await setFeedback(null);
        if (citation) {
            setFeedback({isCorrect: isGoodAnswer});
            const differentCitation = await citationApiService.getDifferentCitation(citation);
            setCitation(differentCitation);
            setOptions([]); // Réinitialise les options à un tableau vide
            if (differentCitation) {
                const allAuthors = await citationApiService.getDifferentAuthors(differentCitation.auteur);
                if (allAuthors) {
                    const shuffledOptions = shuffle([...allAuthors, differentCitation.auteur]);
                    setOptions(shuffledOptions);
                }
            }
            if (isGoodAnswer) {
                setNbBonneRep(nbBonneRep + 1);
            } else if (nbVies >= 0) {
                setNbVies(nbVies - 1);
                if (nbVies === 0) {
                    setIsPartieEnCours(false);
                }
            }
        }
    };

    const reset = async () => {
        setIsPartieEnCours(true);
        setNbVies(3);
        setNbBonneRep(0);
        setFeedback(null);
        await fetchCitationDuJour(); // Recharge une nouvelle citation
    };

    return (
        <div className="qcm_page">
            <HeaderPage title={"Devine l'auteur"} backLink={RoutesTypes.HOME} />
            {feedback && <AnswerFeedback isCorrect={feedback.isCorrect} onAnimationEnd={() => {
            }}/>}
            {isPartieEnCours ? (
                <>
                    {citation && options ? (
                        <div>
                            <Qcm
                                texte={citation.texte}
                                auteur={citation.auteur}
                                options={options}
                                fetchDifferentCitation={handleAnswer}
                            />
                            <p>Streak : {nbBonneRep}</p>
                            <p>Nombre de vies : {nbVies}</p>
                        </div>
                    ) : (
                        <Loader/>
                    )}
                </>
            ) : (
                <div>
                    <div className="game-over">Perdu !</div>
                    <Button title={"Rejouer ?"} onClick={reset}></Button>
                </div>
            )}
        </div>
    );
};

export default CitationPage;
