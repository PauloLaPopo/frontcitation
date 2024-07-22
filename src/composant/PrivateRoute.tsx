import React from 'react';
import { Navigate } from 'react-router-dom';
import RoutesTypes from "../models/RoutesTypes";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? <>{children}</> : <Navigate to={RoutesTypes.LOGIN} />;
};

export default PrivateRoute;
