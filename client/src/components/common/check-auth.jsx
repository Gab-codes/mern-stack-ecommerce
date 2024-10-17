import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

   // Redirect an authenticated user away from login/register
    if (isAuthenticated) {
        if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
            if (user?.role === 'admin') {
                return <Navigate to='/admin/dashboard' />;
            } else {
                return <Navigate to='/shop/home' />;
            }
        }
    }

    // If not authenticated and not on login/register, redirect to login
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to='/auth/login' />;
    }

    // Prevent non-admin users from accessing admin pages
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
        return <Navigate to="/unauth-page" />;
    }

    // Prevent admin users from accessing shop pages
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}
