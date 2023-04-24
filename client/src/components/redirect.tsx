import routes from 'navigation/routes';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RedirectToLogin = () => {
  const { pathname } = useLocation();

  return <Navigate to={`${routes.LoginPage}?redirectTo=${pathname}`} />;
};

export default RedirectToLogin;
