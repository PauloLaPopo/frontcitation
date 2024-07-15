import React, { useState, useEffect } from 'react';
import { Citation } from '../models/Citation';
import citationApiService from "../service/CitationApiService";
import {shuffle} from "../utils/Shuffle";
import {Link} from "react-router-dom";
import Qcm from "./Qcm";
import Loader from "./utils/Loader";

const CitationDuJour: React.FC = () => {
    const [citation, setCitation] = useState<Citation | null>(null);
    const [options, setOptions] = useState<string[]>([]); // Initialisé avec un tableau vide
    const [nbBonneRep, setNbBonneRep] = useState<number>(0);
    const [nbVies, setNbVies] = useState<number>(3);
    const [isPartieEnCours, setIsPartieEnCours] = useState<boolean>(true);

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

    const fetchDifferentCitation = async (isGoodAnswer: boolean) => {
        if (citation) {
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
        await fetchCitationDuJour(); // Recharge une nouvelle citation
    };

    return (
        isPartieEnCours ? (
            <div>
                <div className="header_page">
                    <Link to="/" className="back-link">
                        <span className="arrow-left">&#x2190;</span> {/* Flèche vers la gauche */}
                        <span className="back-text">Retour</span>
                    </Link>
                    <h1 className="title">Devine l'auteur</h1>
                </div>
                {citation ? (
                    <div>
                    <Qcm
                        texte={citation.texte}
                        auteur={citation.auteur}
                        options={options}
                        fetchDifferentCitation={fetchDifferentCitation}
                    />
                        <p>Streak : {nbBonneRep}</p>
                        <p>Nombre de vies : {nbVies}</p>
                    </div>
                ) : (
                    <Loader/>
                )}
            </div>
        ) : (
            <div>
                <div>Perdu !</div>
                <button onClick={reset}>Rejouer ?</button>
            </div>
        )
    );
};

export default CitationDuJour;
