import React from "react";
import {Link} from "react-router-dom";
import Button from "../utils/Button";
import "../../styles/composants/admin/AdminPage.css"
import RoutesTypes from "../../models/RoutesTypes";

const AdminPage: React.FC = () => {

    return (
        <div className="admin-container">
            <h1>Admin Page</h1>
            <div className="admin-buttons">
                <Link to={RoutesTypes.ADD_CITATION}>
                    <Button title={"Ajouter Citation"} type={"primary"}/>
                </Link>
                <Link to={RoutesTypes.LIST_CITATION}>
                    <Button title={"Modifier Citations"} type={"secondary"}/>
                </Link>
                <Link to={RoutesTypes.ADD_PUNCHLINE}>
                    <Button title={"Ajouter Punchline"} type={"primary"}/>
                </Link>
                <Link to={RoutesTypes.LIST_PUNCHLINE}>
                    <Button title={"Modifier Punchline"} type={"secondary"}/>
                </Link>
            </div>
        </div>
    );
}

export default AdminPage;