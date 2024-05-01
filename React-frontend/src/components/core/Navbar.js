import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Link, Avatar, IconButton, Menu, MenuItem, Dialog, DialogContent, DialogActions, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo2.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';

const useStyles = makeStyles((theme) => ({
  appBar: {
    
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    position: 'fixed',
  },
  toolbar: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    textDecoration: 'none',
    color:'#fff',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    }
  },
  link: {
    color: '#fff',
    marginRight: theme.spacing(2),
    '&:hover': {
      color: '#FF0000',
      textDecoration: 'none'
    }
  },
  button: {
    color: '#fff',
    borderColor: theme.palette.secondary.main,
    '&:hover': {
      color: '#FF0000',
    },
    '&:focus': {
      outline: 'none'
    }
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontSize: '17px'
  }
}));

export function Header() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleSignupOpen = () => {
    setOpenSignUp(true);
  };

  const handleSignupClose = () => {
    setOpenSignUp(false);
  };

  const handleLogout = () => {
    dispatch(logout(history));
    handleClose();
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant="h6" component={RouterLink} to="/" className={classes.title}>
        MARS - A Comprehensive Digital Forensics Toolkit  
      </Typography>
      <div>
        {auth.isAuthenticated ? (
          <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar className={classes.purple}>
                {auth.user ? auth.user.name.charAt(0).toUpperCase() : <span>W</span>}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
            <Button color="inherit" onClick={handleSignupOpen}>Sign Up</Button>
            <Dialog open={openLogin} onClose={handleLoginClose}>
              <DialogContent>
                <LoginForm />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLoginClose} color="primary">Cancel</Button>
                <Button onClick={handleSignupOpen} color="primary">Sign Up</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openSignUp} onClose={handleSignupClose}>
              <DialogContent>
                <RegisterForm />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSignupClose} color="primary">Cancel</Button>
                <Button onClick={handleLoginOpen} color="primary">Login</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </Toolbar>
  );
}

export default function Navbar() {
  return (
    <AppBar position="static" className={useStyles().appBar}>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
    </AppBar>
  );
}
