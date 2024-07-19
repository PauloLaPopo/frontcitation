import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/composants/authentification/LoginPage.css';
import Button from '../utils/Button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token, navigate]);

    // Handle login
    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Handle submit event
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <Button title="Login" onClick={handleLogin} type="primary" />
                    <Button title="Register ?" onClick={() => navigate('/register')} />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
