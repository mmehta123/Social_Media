import React,{useEffect, useState} from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import {useDispatch} from "react-redux"

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles"
import {getPosts} from "./actions/posts"



const App = () => {
    const dispatch=useDispatch();
    const classes=useStyles();
    const [currentId,setCurrentId]=useState(null);

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);
    
    return (
        <div>
            <Container>
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center" >Social-dict</Typography>
                    <img className={classes.image} src={memories} alt="Socialdict" height="60" />
                </AppBar>
                <Grow in>
                    <Grid container justifyContent="space-between" alignItems="stretch">
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Grow>
            </Container>
        </div>
    );
}

export default App;