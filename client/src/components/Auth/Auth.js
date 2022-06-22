import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
// import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../constants/actionTypes';
import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyle from "./styles"
import Input from './Input';
import Icon from './icon';
import { signIn, signUp } from "../../actions/auth.js";


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 5 || formData.password.length > 10) {
            alert("minimum password length 5 required and maximum of 10 characters");
            return
        }
        if (isSignUp) {
            if (formData.firstName <= 0 && formData.lastName <= 0) {
                alert('Please enter a valid first and last name');
                return
            }
            if (formData.password !== formData.confirmPassword) {
                alert("password and confirm password must be the same");
                return
            }
            dispatch(signUp(formData, history));
        } else {

            dispatch(signIn(formData, history));
        }
    }

    // const googleSuccess = async (res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;
    //     console.log("login succesfull");
    //     try {
    //         dispatch({ type: AUTH, data: { result, token } });

    //         history.push('/');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const googleError = () =>console.log('Google Sign In was unsuccessful. Try again later');


    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const toggleSignUp = () => {
        setFormData(initialState);
        setShowPassword(false)
        setIsSignUp((prev) => !prev);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h4">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && (
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                            )}
                    </Grid>
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="secondary">
                        {
                            isSignUp ? "Sign Up" : "Sign In"
                        }
                    </Button>

                    {/* <GoogleLogin
                        clientId="349706851057-gjr8bc6tb4j1p0drsn6i01m3aobjk1gj.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    /> */}

                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={toggleSignUp}>
                                {
                                    isSignUp ? "Already have an account? SignIn" : "Don't have an account? SignUp"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;