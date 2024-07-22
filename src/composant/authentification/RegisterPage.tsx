import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import '../../styles/composants/authentification/RegisterPage.css'
import RoutesTypes from "../../models/RoutesTypes";

const RegisterPage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await register(userName, email, password);
            navigate(RoutesTypes.HOME);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-buttons">
                    <button onClick={() => navigate(RoutesTypes.LOGIN)}>Retour</button>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
