import React, { useState, useEffect, useRef, useCallback } from 'react';
import citationApiService from '../../../service/CitationApiService';
import { Citation } from '../../../models/Citation';
import Loader from "../../utils/Loader";

const CitationList: React.FC = () => {
    const [citations, setCitations] = useState<Citation[]>([]);
    const [displayedCitations, setDisplayedCitations] = useState<Citation[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchCitations = async () => {
            setLoading(true);
            const allCitations = await citationApiService.getAllCitations();
            console.log(allCitations);
            setCitations(allCitations);
            setDisplayedCitations(allCitations.slice(0, 10)); // Affiche les 10 premières citations
            setLoading(false);
        };

        fetchCitations();
    }, []);

    const loadMore = () => {
        if (citations.length > displayedCitations.length) {
            setDisplayedCitations(prevCitations => [
                ...prevCitations,
                ...citations.slice(prevCitations.length, prevCitations.length + 10),
            ]);
        } else {
            setHasMore(false);
        }
    };

    const lastCitationElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div>
            <h1>Citations</h1>
            {displayedCitations.map((citation, index) => {
                if (displayedCitations.length === index + 1) {
                    return (
                        <div ref={lastCitationElementRef} key={citation.id}>
                            <p>{citation.texte} - {citation.auteur}</p>
                            <button>Modifier</button>
                            <button>Supprimer</button>
                        </div>
                    );
                } else {
                    return (
                        <div key={citation.id}>
                            <p>{citation.texte} - {citation.auteur}</p>
                            <button>Modifier</button>
                            <button>Supprimer</button>
                        </div>
                    );
                }
            })}
            {loading && <Loader/>}
        </div>
    );
};

export default CitationList;
