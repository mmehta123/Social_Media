import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from "./styles.js"
import React, { useState,useRef } from 'react'
import { commentPost } from '../../actions/posts.js';

const Comments = ({ post }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments, setComments] = useState(post?.Comments);
    const [comment, setComment] = useState("");
    const commentsRef=useRef();
    const dispatch = useDispatch();
    


    const handleComment = async () => {
        const fullComment = `${user?.result?.name}: ${comment}`
        const newComments = await dispatch(commentPost(fullComment, post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h3' >
                        Comments:
                    </Typography>
                    <Divider />
                    { comments &&
                        comments.map((c, i) => (
                            <Typography gutterBottom variant='subtitle1' key={i} >
                                <strong>{c.split(":")[0]}</strong>
                                :
                                {c.split(":")[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentsRef}>

                    </div>
                </div>
                {user?.result?.name && (
                    <div style={{ width: '100%' }}>
                        <Typography gutterBottom variant='h6' >
                            Write Your Comment Here:
                        </Typography>
                        <TextField
                            fullWidth
                            minRows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: "10px" }} fullWidth variant="contained" color='primary' disabled={!comment} onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )
                }
            </div>
        </div>
    )
}
export default Comments;
