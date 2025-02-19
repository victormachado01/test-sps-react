import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Users from "../pages/Users";
import SignIn from "../pages/SignIn";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default AppRoutes;
