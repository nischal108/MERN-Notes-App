import React from 'react';
import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import useAuthContext from '../contexts/useAuthContext';
import LoadingPage from '../pages/LoadingPage';

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuthContext();
  if(loading){
    return <LoadingPage/>
  }
  

  return isAuthenticated ? <HomePage /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
