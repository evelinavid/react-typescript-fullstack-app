import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector } from 'redux/store/store';
import { authAction } from 'redux/user/userSlice';
import router from './navigation/router';
import theme from './theme/index';

type AuthInitializerProps = {
  children: React.ReactNode
};

const rootHtmlElement = document.getElementById('root') as HTMLElement;
const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (token) {
      dispatch(authAction());
    }
  }, []);

  if (token !== null && user === null) return null;
  // if (token !== null && user === null) return <div>Loading animacija</div>;
  return (
    <>
      {children}
      <span />
    </>
  );
};
ReactDOM
  .createRoot(rootHtmlElement)
  .render(
    <Provider store={store}>
      <AuthInitializer>

        <ThemeProvider theme={theme}>
          <CssBaseline />

          <RouterProvider router={router} />

        </ThemeProvider>
      </AuthInitializer>
    </Provider>,
  );
