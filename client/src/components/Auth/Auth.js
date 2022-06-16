import React, { useState } from 'react'
import { Avatar, Container, Paper, Typography, Grid ,Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyle from "./styles"
import Input from './Input';

const Auth = () => {
    const classes = useStyle();
    const [isSignUp,setIsSignUp] = useState(false)
    // mock state for checking purpose only
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const toggleSignUp = () => {
        setIsSignUp((prev)=>!prev);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lasttname" label="Last Name" handleChange={handleChange} half />
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
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {
                            isSignUp ? "Sign Up" : "Sign In"
                        }
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={toggleSignUp}>{
                                isSignUp ? "Already have an account? SignIn" : "Don't have an account? SignUp"
                            }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth