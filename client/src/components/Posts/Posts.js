import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles"
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core"

const Posts = ({ setCurrentId }) => {
    const {posts,isLoading} = useSelector((state) => { return state.posts });
    const classes = useStyles();

    if (posts !== undefined){
        if(!posts.length && !isLoading) {
            return "Oops! No Posts Found!"; 
        }
    }
    
    return (
        !posts?.length || isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))
                }
            </Grid>
        )
    );
}

export default Posts;