import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import CitationPage from './composant/CitationPage';
import AddCitationPage from './composant/admin/citations/AddCitationPage';
import PunchlinePage from './composant/PunchlinePage';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AdminPage from "./composant/admin/AdminPage";
import CitationList from "./composant/admin/citations/CitationList";
import ModifierCitation from "./composant/admin/citations/ModifierCitation";
import Register from "./composant/authentification/RegisterPage";
import Login from "./composant/authentification/LoginPage";
import PrivateRoute from "./composant/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import RoutesTypes from "./models/RoutesTypes";
import AdminRoute from "./composant/AdminRoute";
import AddPunchlinePage from "./composant/admin/punchlines/AddPunchlinePage";
import PunchlineList from "./composant/admin/punchlines/PunchlineList";
import ModifierPunchline from "./composant/admin/punchlines/ModifierPunchline";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header/>
                    <div className="content">
                        <Routes>
                            <Route path="*" element={<Navigate to={RoutesTypes.LOGIN}/>}/>
                            <Route path={RoutesTypes.LOGIN} element={<Login/>}/>
                            <Route path={RoutesTypes.REGISTER} element={<Register/>}/>
                            <Route path={RoutesTypes.HOME} element={<PrivateRoute> <HomePage/> </PrivateRoute>}/>
                            <Route path={RoutesTypes.CITATION} element={<PrivateRoute> <CitationPage/> </PrivateRoute>}/>
                            <Route path={RoutesTypes.PUNCHLINE} element={<PrivateRoute> <PunchlinePage/> </PrivateRoute>}/>

                            <Route path={RoutesTypes.ADMIN} element={<AdminRoute><AdminPage/> </AdminRoute>}/>
                            <Route path={RoutesTypes.ADD_CITATION} element={<AdminRoute><AddCitationPage/> </AdminRoute>}/>
                            <Route path={RoutesTypes.LIST_CITATION} element={<AdminRoute><CitationList/> </AdminRoute>}/>
                            <Route path={`${RoutesTypes.UPDATE_CITATION}/:id`} element={<AdminRoute><ModifierCitation/></AdminRoute>}/>

                            <Route path={RoutesTypes.ADD_PUNCHLINE} element={<AdminRoute><AddPunchlinePage/></AdminRoute>}/>
                            <Route path={RoutesTypes.LIST_PUNCHLINE} element={<AdminRoute><PunchlineList/></AdminRoute>}/>
                            <Route path={`${RoutesTypes.UPDATE_PUNCHLINE}/:id`} element={<AdminRoute><ModifierPunchline/></AdminRoute>}/>
                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
