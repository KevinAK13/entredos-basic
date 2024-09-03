import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// Componente Layout
function Layout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

// Componente RequireAuth
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export { Layout, RequireAuth };
