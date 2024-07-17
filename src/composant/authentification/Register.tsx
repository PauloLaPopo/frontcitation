import React, {useState} from "react";
import axios from "axios";
import ErrorTypes from "../../models/ErrorTypes";
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorType, setErrorType] = useState<ErrorTypes | null>(null);

    const save = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/user/save", {
                userId: null,
                userName: userName,
                email: email,
                password: password,
            });
            navigate('/home');
        } catch (err: any) {
            if (err.response) {
                // Erreur de réponse de l'API avec un code HTTP
                console.error('Code HTTP : ', err.response.status);
                console.error('Réponse de l\'API : ', err.response.data);
                if (err.response.data === ErrorTypes.EMAIL_ALREADY_EXISTS) {
                    setErrorType(ErrorTypes.EMAIL_ALREADY_EXISTS);
                }
                if (err.response.data === ErrorTypes.USER_NAME_ALREADY_EXISTS) {
                    setErrorType(ErrorTypes.USER_NAME_ALREADY_EXISTS);
                }
            } else if (err.request) {
                // La requête a été faite mais pas de réponse reçue
                console.error('Pas de réponse reçue de l\'API : ', err.request);
            } else {
                // Erreur inattendue
                console.error('Erreur inattendue : ', err.message);
            }
        }
    };

    const errorMessage = () => {
        if (errorType === null) {
            return;
        } else if (errorType === ErrorTypes.USER_NAME_ALREADY_EXISTS) {
            return (
                <div>Le nom d'utilisateur est déjà utilisé</div>
            )
        } else if (errorType === ErrorTypes.EMAIL_ALREADY_EXISTS) {
            return (
                <div>Cet email est déjà utilisé</div>
            )
        }
    }

    return (
        <div>
            <div className="container mt-4">
                <button onClick={() => navigate('/')}>Retour</button>
                <div className="card">
                    <h1>User Registration</h1>
                    {errorMessage()}
                    <form onSubmit={save}>
                        <div className="form-group">
                            <label htmlFor="userName">Nom d'utilisateur</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                placeholder="Enter Name"
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-4">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
