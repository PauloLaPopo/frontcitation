import React, {useCallback, useEffect, useRef, useState} from "react";
import {Punchline} from "../../../models/Punchline";
import punchlineApiService from "../../../service/PunchlineApiService";
import HeaderPage from "../../utils/HeaderPage";
import PunchlineItem from "./PunchlineItem";
import Loader from "../../utils/Loader";
import "../../../styles/composants/admin/punchlines/PunchlineList.css";

const PunchlineList: React.FC = () => {
    const [punchlines, setPunchlines] = useState<Punchline[]>([]);
    const [displayedPunchlines, setDisplayedPunchlines] = useState<Punchline[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchPunchlines = async () => {
            setLoading(true);
            const allPunchlines = await punchlineApiService.getAllPunchlines();
            setPunchlines(allPunchlines);
            setDisplayedPunchlines(allPunchlines.slice(0, 10));
            setLoading(false);
        };

        fetchPunchlines();
    }, []);

    const loadMore = () => {
        if (punchlines.length > displayedPunchlines.length) {
            setDisplayedPunchlines(prevPunchlines => [
                ...prevPunchlines,
                ...punchlines.slice(prevPunchlines.length, prevPunchlines.length + 10),
            ]);
        } else {
            setHasMore(false);
        }
    }

    const lastPunchlineElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const handleDeletePunchline = (id: string) => {
        setPunchlines(prevPunchlines => prevPunchlines.filter(punchline => punchline.id !== id));
    };

    return (
        <div className="list-punchlines-container">
            <HeaderPage title="Listes des punchlines" backLink="/admin"/>
            <div className="punchline-list">

            </div>
            {displayedPunchlines.map((punchline, index) => {
                if (displayedPunchlines.length === index + 1) {
                    return (
                        <div ref={lastPunchlineElementRef} key={punchline.id}>
                            <PunchlineItem index={index} punchline={punchline} onDelete={handleDeletePunchline}/>
                        </div>
                    );
                } else {
                    return (
                        <div key={punchline.id}>
                            <PunchlineItem index={index} punchline={punchline} onDelete={handleDeletePunchline} />
                        </div>
                    );
                }
            })}
            {loading && <Loader/>}
        </div>
    );
};

export default PunchlineList;