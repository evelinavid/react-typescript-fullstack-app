import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SerivcesPage from 'pages/services-page';
import RegisterPage from 'pages/register-page';
import LoginPage from 'pages/login-page';
import NavbarLayout from 'layouts/navbar-layout';
import SingleServicePage from 'pages/single-service-page';
import ChatPage from 'pages/user-menu/chat-page';
import AccountPage from 'pages/user-menu/account-page';
import ProfilePage from 'pages/user-menu/profile-page';
import UserMenuLayout from 'layouts/user-menu-layout';
import PostServices from 'pages/single-service-form/post-services';
import AboutPage from 'pages/about-page';
import routes from './routes';
import BackgroundLayout from '../layouts/background-layout';
import RequireAuth from './require-auth';
import RequireVisitor from './require-visitor';

const router = createBrowserRouter([

  {
    path: '/',
    element: <NavbarLayout />,
    children: [
      {
        path: '/',
        element: <BackgroundLayout />,
        children: [
          {
            path: routes.RegisterPage,
            element: <RequireVisitor><RegisterPage /></RequireVisitor>,
          }, {
            path: routes.LoginPage,
            element: <RequireVisitor><LoginPage /></RequireVisitor>,
          },
        ],
      },

      {
        path: routes.ServicesPage,
        element: <RequireAuth><SerivcesPage /></RequireAuth>,
      },
      {
        path: routes.SingleServicePage.path,
        element: <RequireAuth><SingleServicePage /></RequireAuth>,
      },
      {
        path: '/',
        element: <UserMenuLayout />,
        children: [
          {
            path: routes.AccountPage,
            element: <RequireAuth><AccountPage /></RequireAuth>,
          },
          {
            path: routes.ChatPage,
            element: <RequireAuth><ChatPage /></RequireAuth>,
          },
          {
            path: routes.ChatUserPage.path,
            element: <RequireAuth><ChatPage /></RequireAuth>,
          },
          {
            path: routes.ProfilePage,
            element: <RequireAuth><ProfilePage /></RequireAuth>,
          },
          {
            path: routes.PostServices,
            element: <RequireAuth><PostServices /></RequireAuth>,
          },
          {
            path: routes.EditPostService.path,
            element: <RequireAuth><PostServices /></RequireAuth>,
          }],
      },
      {
        index: true,
        element: <RequireVisitor><AboutPage /></RequireVisitor>,
      },
    ],
  },

]);

export default router;
