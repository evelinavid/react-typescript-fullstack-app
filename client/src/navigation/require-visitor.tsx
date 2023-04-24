import React from 'react';
import { useAppSelector } from 'redux/store/store';
import { Navigate, useSearchParams } from 'react-router-dom';
import routes from './routes';

const RequireVisitor = ({ children }:any) => {
  const { user } = useAppSelector((state) => state.users);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  if (user !== null) {
    if (redirectTo) return <Navigate to={redirectTo} />;
    return <Navigate to={routes.ServicesPage} />;
  }
  return (
    <div>{children}</div>
  );
};

export default RequireVisitor;
