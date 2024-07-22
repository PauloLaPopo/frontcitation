import React, {useState} from "react";
import {Punchline} from "../../../models/Punchline";
import punchlineApiService from "../../../service/PunchlineApiService";
import Button from "../../utils/Button";
import {Link} from "react-router-dom";
import RoutesTypes from "../../../models/RoutesTypes";
import PopUp from "../../utils/PopUp";
import "../../../styles/composants/admin/punchlines/PunchlineItem.css";

interface PunchlineItemProps {
    index: number;
    punchline: Punchline;
    onDelete: (id: string) => void;
}

const PunchlineItem: React.FC<PunchlineItemProps> = ({ index, punchline, onDelete}) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleDelete = () => {
        setShowPopup(true);
    }

    const handleConfirmDelete = async () => {
        if (punchline.id) {
            await punchlineApiService.deletePunchline(punchline.id);
            onDelete(punchline.id);
            setShowPopup(false);
        }
    }

    const handleCancelDelete = () => {
        setShowPopup(false);
    }

    return (
        <div className="punchline-item">
            <p>{index} - {punchline.punchline} - {punchline.auteur} - {punchline.titre}</p>
            <Link to={`${RoutesTypes.UPDATE_PUNCHLINE}/${punchline.id}`}>
                <Button title="Modifier" type="primary"/>
            </Link>
            <Button title="Supprimer" type="secondary" onClick={handleDelete}/>
            {showPopup && (
                <PopUp
                    message={"Êtes-vous sûr de vouloir supprimer cette punchline ?"}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default PunchlineItem;