import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    const fromPath = location.state?.from || "/shop/home"; 

    const publicRoutes = ["/auth/login", "/auth/register", "/shop/home", "/shop/listing", "/shop/search"];

    if (isAuthenticated && (location.pathname === "/auth/login" || location.pathname === "/auth/register")) {
        return <Navigate to="/shop/home" replace />;
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
        return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
    }

    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
        return <Navigate to="/unauth-page" />;
    }

    return <>{children}</>;
}
