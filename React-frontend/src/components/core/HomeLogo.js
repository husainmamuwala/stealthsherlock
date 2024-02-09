import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  Link,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { useSelector } from 'react-redux';


// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10vh',
    height: '82.5vh',
    padding: '0'
  },
  left: {
    width: '35%',
    height: '82.5vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    
    margin: `${theme.spacing(2)}px 0`
  },
  buttons: {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3)
  },
  Btn: {
    backgroundColor: theme.palette.primary.extraLight,
    color: '#fff',
    width: '100px',
    height: '40px',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    lineHeight: '40px',
    border: 'none',
    outline: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:focus': {
      outline: 'none'
    }
  },
  knowMoreBtn: {
    width: '140px',
    height: '40px',
    fontWeight: 'bold',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    lineHeight: '30px',
  },
  right: {
    position: 'relative',
    width: '65%',
    height: '82.5vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightInner: {
    width: '80%',
    height: '80%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fafafa',
    padding: theme.spacing(5),
    clipPath: 'circle(10% at 0% 0%)',
    transition: 'clip-path .4s ease-in',
    zIndex: 999,
    '&:hover': {
      clipPath: 'circle(150% at 0% 0%)'
    },
  },
  rightInner2: {
    position: 'absolute',
    width: '80%',
    minHeight: '80%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff',
    padding: theme.spacing(5),
  },
  title: {
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  textBody: {
    fontSize: theme.spacing(1.5),
    fontWeight: 600,
    color: '#909090'
  }
}))


// Main Component
function HomeLogo() {

  // Invoke custom classes
  const classes = useStyles()

  // Get auth Reducer
  const auth = useSelector(state => state.auth)

  // State to hold modal opening variables
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)

  // function to handle login modal open state
  const handleOpenLogin = () => {
    setOpenLogin(true)
  }

  // Function to handle login modal close state
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  // Function to handle Signup Modal open state
  const handleOpenSignUp = () => {
    setOpenSignUp(true)
  }

  // Function to handle Signup modal close state
  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  // Returning JSX
  return (
    <Container className={classes.root}>
      <Grid container>
        
          {(auth && !auth.isAuthenticated) && (
        <Grid item xs={12} sm={12} md={4} className={classes.left}>
          <img src='/img/sherlock4.svg' alt="openMF" className={classes.logo} />
            <div>
              <Button className="bg-red" variant="contained" onClick={handleOpenLogin} color="primary">
                Login
              </Button>
              <Dialog open={openLogin} aria-labelledby="login-form" scroll="body">
                <DialogContent >
                  <LoginForm setOpenLogin={setOpenLogin} />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenLogin(false)
                      setOpenSignUp(true)
                    }}
                    variant="outlined"
                    color="primary"
                    
                    disableRipple
                    disableTouchRipple
                  >
                    Register
                  </Button>

                  <Button
                    onClick={handleCloseLogin}
                    color="primary"
                    className='px-14'
                    disableRipple
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>


              <Button
                variant="outlined"
                color='primary'
                style={{marginLeft:'1rem'}}
                disableRipple
                onClick={handleOpenSignUp}
              >
                Register
              </Button>
              <Dialog open={openSignUp} aria-labelledby="signup-form" scroll="body">
                <DialogContent >
                  <RegisterForm setOpenSignUp={setOpenSignUp} />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenSignUp(false)
                      setOpenLogin(true)
                    }}
                    variant="outlined"
                    color="primary"
                    disableRipple
                  >
                    Login
                  </Button>

                  <Button
                    onClick={handleCloseSignUp}
                    color="primary"
                    disableRipple
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          <span style={{marginTop:'1rem'}}>v 1.0</span>

        </Grid>
          )}
      </Grid>
      
    </Container>

  )
}

export default HomeLogo

