import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/posts";
import { Card, CardActions, CardMedia, CardContent, Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import InfoIcon from "@material-ui/icons/Info";
import moment from "moment";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost } from "../../actions/posts"




export const Profile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const userid = user.result._id;
  const name = user.result.name;
  const email = user.result.email;

  const { userpost, isLoading } = useSelector((state) => state.posts);



  useEffect(() => {
    dispatch(getProfile(userid));
  }, [userid]);

  const openPost = (id) => {
    history.push(`/posts/${id}`);
  }

  const Post = ({ post }) => {
    return (
      <div className={classes.main}>
        <Card className={classes.card} raised elevation={20}>
          <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom color="textPrimary">{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">&nbsp; {post.message}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions} >
            <Button size="small" color="primary" onClick={() => { openPost(post._id) }}>
              <InfoIcon fontSize="small" />
              Details
            </Button>
            <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)); alert("post deleted"); history.push(`/posts/`) }}>
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
  
  const InfoField=() => {
    return (
      <div >
        <h4>Name:{name}</h4>
        <h4>Email:{email}</h4>
      </div>

    );
  }
  if (userpost !== undefined) {
    if (!userpost.length && !isLoading) {
      return (
        <Card style = {{ padding: '2rem', borderRadius: '2rem' }} >
          <InfoField/>
          <div>
            Oops! No Posts Found!
          </div>
          </Card>
      );
    }
  }



  return (
    <>
    <Card style={{ padding: '2rem', borderRadius: '2rem' }}>
    <InfoField/>
    </Card>
      <Card style={{ padding: '2rem', borderRadius: '2rem', marginTop: '1rem' }}>
        <Typography variant="h2" color="textPrimary">Posts</Typography>
        {!userpost?.length || isLoading ? (<CircularProgress />) :
          <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
            {(userpost !== undefined) && userpost.map((post) =>
              <Post post={post} key={post._id} />
            )
            }
          </Grid>
        }
      </Card>
    </>
  )
}
