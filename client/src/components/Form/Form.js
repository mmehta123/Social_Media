import React, { useState ,useEffect} from "react";
import useStyles from "./styles"
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch,useSelector} from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";





const Form = ({ setCurrentId, currentId }) => {
    const classes = useStyles();
    const dispatch=useDispatch();
    const history=useHistory();
    const post=useSelector((state)=>currentId ? state.posts.posts.find((p)=>p._id===currentId):null) ;  
    const user=JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, { ...postData,name: user?.result?.name }));
        }else
        {
            // we want to navigate to newly created post, so we need to use history.push(`/posts/${id)`) but we
            //  don't have newly created post id so we pass to action create post where we will get current id
            dispatch(createPost({...postData,name:user?.result?.name},history));
        }
        clear();
    }

    const clear=()=>{
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if (!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center" >
                    Please Sign In/Up To create your Post.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing`:`Creating` } a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" minRows={4} multiline fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            <div className={classes.fileInput}>
            <FileBase 
            type="file"
            multiple={false}
            onDone={({base64})=>{setPostData({...postData,selectedFile:base64})}}/>
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size='large' type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size='small' onClick={clear}  fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;