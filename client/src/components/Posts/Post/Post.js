import React from "react";
import useStyles from "./styles";
import { Card, CardActions, CardMedia, CardContent, Button, Typography, ButtonBase } from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import InfoIcon from "@material-ui/icons/Info";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";



const Post = ({ post, setCurrentId }) => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likeCount.length > 0) {
            return post.likeCount.find((like) => like === (user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likeCount.length > 2 ? `You and ${post.likeCount.length - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likeCount.length} {post.likeCount.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        
        history.push(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={20}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
                </div>

                {(user?.result?._id === post.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: "white" }} size="small" onClick={() => { setCurrentId(post._id) }}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}

                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>

                <Typography className={classes.title} variant="h5" gutterBottom color="textPrimary">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">&nbsp; {post.message}</Typography>
                </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => { dispatch(likePost(post._id)) }}>
                    <Likes />
                </Button>
                <Button size="small" color="primary" onClick={openPost}>
                    <InfoIcon fontSize="small" />
                    Details
                </Button>
                {(user?.result?._id === post.creator) &&
                    <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                }
            </CardActions>
        </Card>
    );
}

export default Post;