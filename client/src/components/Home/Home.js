import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux"


import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { getPosts } from "../../actions/posts"
import Pagination from "../Pagination";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import { fetchPostBySearch } from '../../actions/posts'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {


    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');


    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    const [searchInput, setSearchInput] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId]);

    const handleSearch = () => {
        if (searchInput.trim() || tags) {
            dispatch(fetchPostBySearch({ searchInput, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${searchInput || 'none'}&tags=${tags.join(',') || 'b'}`);
        } else {
            history.push("/");

        }
    }
    

    const addTags = (tag) => {
        setTags([...tags, tag]);
    }
    
    const deleteTags = (delTag) => {
        setTags(tags.filter((tag) => tag !== delTag))
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search"
                                fullWidth
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <ChipInput
                                className={classes.chipInput}
                                value={tags}
                                onAdd={addTags}
                                onDelete={deleteTags}
                                label="Input Your  Tags To Search"
                                variant="outlined"
                            />
                            <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );

}

export default Home;