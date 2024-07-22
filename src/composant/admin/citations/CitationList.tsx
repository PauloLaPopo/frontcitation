import React, {useState, useEffect, useRef, useCallback} from 'react';
import citationApiService from '../../../service/CitationApiService';
import {Citation} from '../../../models/Citation';
import Loader from "../../utils/Loader";
import CitationItem from "./CitationItem";
import HeaderPage from "../../utils/HeaderPage";

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

    const handleDeleteCitation = (id: string) => {
        setCitations(prevCitations => prevCitations.filter(citation => citation.id !== id));
    };

    return (
        <div>
            <HeaderPage title={"Liste des citations"} backLink={"/admin"}/>
            {displayedCitations.map((citation, index) => {
                if (displayedCitations.length === index + 1) {
                    return (
                        <div ref={lastCitationElementRef} key={citation.id}>
                            <CitationItem index={index} citation={citation} onDelete={handleDeleteCitation}/>
                        </div>
                    );
                } else {
                    return (
                        <div key={citation.id}>
                            <CitationItem index={index} citation={citation} onDelete={handleDeleteCitation}/>
                        </div>
                    );
                }
            })}
            {loading && <Loader/>}
        </div>
    );
};

export default CitationList;
