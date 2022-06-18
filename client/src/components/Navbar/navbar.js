import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();


    const signout = () => {
        dispatch({ type: 'SIGNOUT' });
        history.push("/");
        setUser(null);
    }


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            
            if (decodedToken.exp * 1000 < new Date().getTime()) { signout(); }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);




    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center" >Social-dict</Typography>
                <img className={classes.image} src={memories} alt="Socialdict" height="60" />
            </div>

            <Toolbar className={classes.toolbar}>
                {user ?
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name  }>{user.result.name}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={signout}>Sign Out</Button>
                    </div>
                    :
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;