import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, NEW_POST, SET_POST } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload
            };
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex((post) => post.postID === action.payload.postID);
            state.posts[index] = action.payload;
            if (state.post.postID === action.payload.postID) {
                state.post = action.payload;
              }
            return {
                ...state
            }
        case DELETE_POST:
            let id = state.posts.findIndex(post => post.postID === action.payload);
            state.posts.splice(id, 1);
            return {
                ...state
            };
        case NEW_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        default:
            return state;
    }
}