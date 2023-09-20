import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/hooks/useAuth";

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
