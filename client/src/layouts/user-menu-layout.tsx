import { Box, Stack } from '@mui/system';
import routes from 'navigation/routes';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const accLinks = [
  { to: routes.ProfilePage, text: 'Profile' },
  { to: routes.AccountPage, text: 'Account' },
  { to: routes.ChatPage, text: 'Messages' },
];

const UserMenuLayout = () => (
  <Box sx={{ display: 'flex', padding: 2 }}>
    <Stack sx={{
      width: 200,
      height: 200,
      display: 'grid',

      a: {
        color: 'black',
        textDecoration: 'none',
        placeSelf: 'center',
        '&.active': {
          color: 'error',
          boxShadow: '#a18b84 0px 5px, #b6a59f 0px 10px',
        },
      },
      alignSelf: 'stretch',
      alignItems: 'center',
      marginLeft: 2,

    }}
    >
      {accLinks.map(({ to, text }) => (
        <NavLink to={to} key={to}>
          {text}
        </NavLink>
      ))}
    </Stack>
    <Outlet />
  </Box>
);

export default UserMenuLayout;
