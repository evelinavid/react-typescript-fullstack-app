import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import routes from 'navigation/routes';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store/store';
import { logoutUserAction } from 'redux/user/userSlice';

const accLinks = [
  { to: routes.ProfilePage, text: 'Profile' },
  { to: routes.AccountPage, text: 'Account' },
  { to: routes.ChatPage, text: 'Messages' },
];
const aboutLink = { to: routes.AboutPage, text: 'About' };
const servicesLink = { to: routes.ServicesPage, text: 'Browse services' };

const userRelatedLinks = [
  { to: routes.RegisterPage, text: 'Register' },
  { to: routes.LoginPage, text: 'Login' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.users);

  const isLogin = !!token;
  // logout
  const logoutHandler = () => {
    dispatch(logoutUserAction());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                a: { textDecoration: 'none', color: 'black' },
              }}
            >
              {!isLogin && (
              <NavLink to={aboutLink.to}>
                <MenuItem key={aboutLink.to} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{aboutLink.text}</Typography>
                </MenuItem>
              </NavLink>
              )}
              {isLogin && (
              <MenuItem key={servicesLink.to} onClick={handleCloseNavMenu}>
                <NavLink to={servicesLink.to}>
                  <Typography textAlign="center">{servicesLink.text}</Typography>
                </NavLink>
              </MenuItem>
              )}

            </Menu>
          </Box>
          <img src="/images/logo.png" alt="logo" width={50} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, a: { textDecoration: 'none' } }}>

            {!isLogin && (
            <NavLink to={aboutLink.to}>
              <Button
                key={aboutLink.to}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {aboutLink.text}
              </Button>
            </NavLink>
            )}
            {isLogin && (
            <NavLink to={servicesLink.to}>
              <Button
                key={servicesLink.to}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {servicesLink.text}
              </Button>
            </NavLink>
            )}

          </Box>
          {!isLogin && (
          <Box sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'flex-end' }, a: { textDecoration: 'none' } }}>
            {userRelatedLinks.map(({ to, text }) => (
              <NavLink to={to} key={to}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, color: 'white', display: 'flex', justifyContent: 'flex-end',
                  }}
                >
                  {text}
                </Button>
              </NavLink>
            ))}
          </Box>
          )}
          {isLogin && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src={user?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {accLinks.map(({ to, text }) => (
                <MenuItem key={text} onClick={handleCloseUserMenu} sx={{ a: { color: 'black', textDecoration: 'none' } }}>
                  <NavLink to={to}>
                    <Typography textAlign="center" component="h5">{text}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )}
          {isLogin && (
          <Button
            onClick={logoutHandler}
            sx={{
              mx: 2, display: 'flex', justifyContent: 'flex-end',
            }}
            variant="outlined"
            color="secondary"
          >
            Logout
          </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
