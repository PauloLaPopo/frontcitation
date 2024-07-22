import React from 'react';
import { Navigate } from 'react-router-dom';
import RoutesTypes from "../models/RoutesTypes";
import RoleType from "../models/RoleType";

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return token && role && role === RoleType.SUPER_ADMIN ?
        <>{children}</> : <Navigate to={RoutesTypes.LOGIN} />;
};

export default AdminRoute;
