import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from "./Button";
import RoutesTypes from "../../models/RoutesTypes";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate(RoutesTypes.LOGIN);
    };

    return (
        <Button title={"Déconnexion"} onClick={handleLogout} type={"primary"}/>
    );
};

export default LogoutButton;
