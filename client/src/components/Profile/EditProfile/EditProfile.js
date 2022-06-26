import React, { useState } from 'react';
import { Card, TextField, Typography, Button, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles.js"
import {updateUserData} from "../../../actions/auth"



export const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [info, setInfo] = useState({
        name: user.result.name,
        age: user.result.age,
        city: user.result.city,
        state: user.result.state,
    });

    const handleSubmit = () => {
        if(userId){
            dispatch(updateUserData(userId, info ));
        }
        clear();
    }

    const clear = () => {
        setInfo({
            name: "",
            age: '',
            city: '',
            state: '',
        })
    }

    return (
        <Paper className={classes.paper}>
            <h3>Edit Your Information</h3>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
                <TextField name="name" required variant="outlined" label="name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
                <TextField name="age" type="number" variant="outlined" label="age" value={info.age} onChange={(e) => setInfo({ ...info, age: e.target.value })} />
                <TextField name="city" variant="outlined" label="city" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} />
                <TextField name="state" variant="outlined" label="state" value={info.state} onChange={(e) => setInfo({ ...info, state: e.target.value })} />
            </form>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size='large' onClick={handleSubmit}>Submit</Button>

        </Paper>
    )
}
