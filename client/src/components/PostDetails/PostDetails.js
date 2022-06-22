import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress } from "@material-ui/core";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import useStyles from "./styles.js";
import { getPost } from '../../actions/posts';
import Comments from '../comments/Comments.js';
import { fetchPostBySearch } from '../../actions/posts';

function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  // // this below useeffect is for reccomended posts when we click any post then it will dispatch an search action 
  // // with search input none and tags of current post we clicked on and return the data in redux state posts.
  // //and then we destructure it in above 11th statement.
  useEffect(() => {
    if (post) {
      dispatch(fetchPostBySearch({ searchInput: 'none', tags: post?.tags.join(',') }))
    }
  }, []);

  if (!post) { return null; }
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }
  // // now we have posts searched from line 25th's action now we got all the post with same tags of the current post 
  // // we have to filter out our current post form recommendedPosts so below statement will do it for us
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (id) => {
    history.push(`/posts/${id}`);
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}  >
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {
        recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography gutterBottom variant='h5'>You might also like</Typography>
            <Divider />
            <Paper>

              <div className={classes.recommendedPosts}>
                {
                  recommendedPosts.map(({ title, message, name, likeCount, selectedFile, _id }) => (
                    <div className={classes.innerDiv}  onClick={() => openPost(_id)} key={_id}>
                      <Typography gutterBottom variant="h6">{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">{name}</Typography>
                      <Typography gutterBottom variant="subtitle2">{message}</Typography>
                      <Typography gutterBottom variant="subtitle1">Likes: {likeCount.length}</Typography>
                      <img src={selectedFile} width="200px" height="180px" />
                    </div>
                  ))

                }
              </div>
            </Paper>
          </div>
        )
      }
    </Paper>
  );
}

export default PostDetails;