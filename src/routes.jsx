import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Pantalla de carga mientras se verifica la autenticación
    return (
      <div
        className="d-flex align-items-center justify-content-center text-light bg-red"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="display-5">MAGEO</h1>
          </div>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !loading) {
    // Si el usuario no está autenticado y el proceso de carga ha terminado, redirige a la página de inicio de sesión
    return <Navigate to="/loginPage" replace />;
  }

  // Si el usuario está autenticado, renderiza el Outlet para permitir el acceso a las rutas protegidas
  return <Outlet />;
};
