import { END_LOADING, START_LOADING } from "../constants/actionTypes";

export default (state = [{isLoading:true,posts:[]}], action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading:true}

        case END_LOADING:
            return { ...state, isLoading: false }

        case "FETCH_BY_SEARCH":
            return {...state,
                posts: action.payload
            };

        case "UPDATE":
            // return state.map((post) => post._id  === action.payload._id ? action.payload : post)
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case "LIKE":
            // return state.map((post) => post._id === action.payload._id ? action.payload : post);
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case "FETCH_ALL":
            return {
                ...state,
                posts: action.payload.postMessages,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            };

        case "CREATE":
            // return [...state, action.payload];
            return { ...state, posts: [...state.posts, action.payload] };

        case "DELETE":
            // return state.filter((post) => { return post._id !== action.payload });
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

        default:
            return state;

    }
}