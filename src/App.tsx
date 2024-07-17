// App.tsx

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import Register from "./composant/authentification/Register";
import Login from "./composant/authentification/Login";

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="content">
                    <Routes>
                        {/*<Route path="/" element={<HomePage/>}/>*/}
                        <Route path="/register" element= { <Register/>} />
                        <Route path="/" element= { <Login/>} />
                        <Route path="/citation-du-jour" element={<CitationDuJour/>}/>
                        <Route path="/ajouter-citation" element={<AddCitationPage/>}/>
                        <Route path="/punchline" element={<Punchlines/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
                        <Route path="/citations" element={<CitationList/>}/>
                        <Route path="/modifier-citation/:id" element={<ModifierCitation/>}/>
                        <Route path="/supprimer-citation/:id" element={<SupprimerCitation/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
