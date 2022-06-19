import * as api from "../api";
import { CREATE, UPDATE, DELETE, FETCH_ALL, START_LOADING, END_LOADING, LIKE, FETCH_BY_SEARCH, FETCH_POST } from "../constants/actionTypes.js"

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const { data } = await api.fetchPostById(id);
        console.log(data)
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);
        // console.log(data);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        // console.log(data);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

// export const likePost = (id) => async (dispatch) => {
//     const user = JSON.parse(localStorage.getItem('profile'));

//     try {
//         const { data } = await api.likePost(id, user?.token);

//         dispatch({ type: LIKE, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };

export const fetchPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const {data:{data}} = await api.fetchPostBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH,payload:data});
        dispatch({ type: END_LOADING });
    } catch (e) {
        console.log(e);
    }
}







