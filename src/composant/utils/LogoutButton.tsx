import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from "./Button";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <Button title={"Déconnexion"} onClick={handleLogout} type={"secondary"}/>
    );
};

export default LogoutButton;
