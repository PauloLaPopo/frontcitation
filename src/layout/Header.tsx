import React from 'react';
import '../styles/layout/Header.css';
import {useAuth} from "../context/AuthContext";
import LogoutButton from "../composant/utils/LogoutButton";
import RoleType from "../models/RoleType"; // Assurez-vous de créer ce fichier pour le style

const Header: React.FC = () => {
    const {token, role} = useAuth();

    return (
        <header className="header">
            <div className="dropdown">
                {token && <button className="dropbtn">Menu</button>}
                <div className="dropdown-content">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    {role === RoleType.SUPER_ADMIN && <a href="/admin">Admin</a>}
                </div>
            </div>
            <div className="logo">
                <img src="/Icone_Pvge.png" alt="Logo"/>
            </div>
            <div>
                {token && <LogoutButton/>}
            </div>
        </header>
    );
};

export default Header;
