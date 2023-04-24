import React from 'react';
import { useAppSelector } from 'redux/store/store';
import RedirectToLogin from 'components/redirect';

const RequireAuth = ({ children }:any) => {
  const { user } = useAppSelector((state) => state.users);
  if (user === null) {
    return <RedirectToLogin />;
  }
  return (
    <div>{children}</div>
  );
};

export default RequireAuth;
