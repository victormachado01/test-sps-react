import { Navigate, Outlet } from "react-router-dom"
import AuthService from "../services/AuthService";

const PrivateRoute = () => {
    return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;