import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import logo from '../../logo.svg';
import Logo from '../../styled-components/Logo';
import LogoAndNameWrapper from '../../styled-components/LogoAndNameWrapper';

const AppBarWithLogout = () => {
  const { push } = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToLogin = () => push('');

  return (
    <AppBar>
      <Toolbar>
        <LogoAndNameWrapper>
          <Logo src={logo} alt="logo" />
          <Typography variant="h6">Jobcoin Sender</Typography>
        </LogoAndNameWrapper>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={navigateToLogin}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWithLogout;
