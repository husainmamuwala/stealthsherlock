/*
* Register Page component.
*/

// Import Dependecies.
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    Card,
    IconButton,
    InputAdornment,
    Avatar
} from '@material-ui/core';
import logo from '../images/logo.png';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { authDefault, signUp } from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authentication } from '../Firebase/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// Custom Styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2, 4),
        width: "350px",
        backgroundColor: '#fdfdfd'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    inputs: {
        height: theme.spacing(6),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.primary.extraLight,
        margin: theme.spacing(1.5, 0),
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    }
}))


function RegisterPage({ setOpenSignUp }) {

    // Invoking custom styles
    const classes = useStyles()

    // history object
    const history = useHistory()

    // auth reducer
    const auth = useSelector(state => state.auth)

    // dispatcher
    const dispatch = useDispatch()

    // setting up default auth state
    useEffect(() => {
        dispatch(authDefault())
    }, [dispatch])

    // states
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)


    // Function to handle Google Sign up
    const SignInWithFirebase = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((re) => {
                console.log(re);
                const user = re.user;
                dispatch(signUp(user.displayName, user.email, user.uid, "admin", history, setOpenSignUp))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container ccomponent="main" maxWidth="xs">
            <Card className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img src='/img/sherlock.png' alt="openMF" style={{ width: "100%" }} />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Register | Sign Up
                </Typography>

                <Typography variant="body1" align="center" color="error">
                    {auth.error}
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="username"
                        label="username"
                        name="username"
                        autoFocus
                        className={classes.inputs}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        className={classes.inputs}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="password"
                        label="password"
                        className={classes.inputs}
                        name="password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        aria-label="Toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        autoComplete="password"
                        type={!showPassword ? "password" : "text"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <FormControlLabel
                        control={<Checkbox checked={accept} onChange={e => setAccept(e.target.checked)} color="primary" />}
                        label={<Typography variant="body2">I accept the Terms of Use & Privacy Policy</Typography>}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!username || !email || !password || !accept || auth.isLoading}
                        onClick={() => dispatch(signUp(username, email, password, "admin", history, setOpenSignUp))}
                    >
                        Sign Up | Register
                    </Button>

                    {/* <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => SignInWithFirebase()}
                    >
                        Sign Up | Register with Google
                    </Button> */}

                </form>
            </Card>
        </Container>
    )
}

export default RegisterPage
