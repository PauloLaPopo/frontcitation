import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import CitationDuJour from './composant/CitationDuJour';
import AddCitationPage from './composant/admin/citations/AddCitationPage';
import Punchlines from './composant/Punchlines';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AdminPage from "./composant/admin/AdminPage";
import CitationList from "./composant/admin/citations/CitationList";
import ModifierCitation from "./composant/admin/citations/ModifierCitation";
import SupprimerCitation from "./composant/admin/citations/SupprimerCitation";
import Register from "./composant/authentification/RegisterPage";
import Login from "./composant/authentification/LoginPage";
import PrivateRoute from "./composant/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header/>
                    <div className="content">
                        <Routes>
                            <Route path="*" element={<Navigate to={"/login"}/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/home" element={<PrivateRoute> <HomePage/> </PrivateRoute>}/>
                            <Route path="/citations" element={<PrivateRoute> <CitationDuJour/> </PrivateRoute>}/>
                            <Route path="/punchline" element={<PrivateRoute> <Punchlines/> </PrivateRoute>}/>

                            <Route path="/admin" element={<AdminPage/>}/>
                            <Route path="/ajouter-citation" element={<AddCitationPage/>}/>
                            <Route path="/list-citations" element={<CitationList/>}/>
                            <Route path="/modifier-citation/:id" element={<ModifierCitation/>}/>
                            <Route path="/supprimer-citation/:id" element={<SupprimerCitation/>}/>
                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
