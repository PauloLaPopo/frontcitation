import React from 'react';
import '../styles/layout/Header.css'; // Assurez-vous de créer ce fichier pour le style

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="dropdown">
                <button className="dropbtn">Menu</button>
                <div className="dropdown-content">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/admin">Admin</a>
                </div>
            </div>
            <div className="logo">
                <img src="/Icone_Pvge.png" alt="Logo" />
            </div>
        </header>
    );
};

export default Header;
