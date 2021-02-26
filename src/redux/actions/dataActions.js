import { SET_POSTS, SET_POST, STOP_LOADING_UI, NEW_POST, LOADING_DATA, LIKE_POST, UNLIKE_POST, SET_TAB, DELETE_POST, LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../types';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
     dispatch({ type: LOADING_DATA });
     axios.get('/posts').then((res) => {
         dispatch({
             type: SET_POSTS,
             payload: res.data
         });
     }).catch((err) => {
         dispatch({
             type: SET_POSTS,
             payload: []
         });
     });
};

export const getSpecifiedUserData = (username) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/user/${username}`).then((res) => {
        dispatch({
            type: SET_POSTS,
            payload: res.data.posts
        });
    }).catch(() => {
        dispatch({
            type: SET_POSTS,
            payload: null
        })
    })
}

export const getPost = (postID) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.get(`/post/${postID}`).then((res) => {
        dispatch({
            type: SET_POST,
            payload: res.data
        })
        dispatch({
            type: STOP_LOADING_UI
        })
    }).catch((err) => console.error(err))
}

 export const likePost = (postID) => (dispatch) => {
     axios.get(`/post/${postID}/like`).then((res) => {
         dispatch({
             type: LIKE_POST,
             payload: res.data
         })
     }).catch((err) => console.error(err));
 };

 export const unlikePost = (postID) => (dispatch) => {
    axios.get(`/post/${postID}/unlike`).then((res) => {
        dispatch({
            type: UNLIKE_POST,
            payload: res.data
        })
    }).catch((err) => console.error(err));
};

export const newPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost).then((res) => {
        dispatch({
            type: NEW_POST,
            payload: res.data
        })
        dispatch({ type: CLEAR_ERRORS })
    }).catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const deletePost = (postID) => (dispatch) => {
    axios.delete(`/post/${postID}`).then(() => {
        dispatch({ 
            type: DELETE_POST,
            payload: postID
        });
    }).catch((err) => console.error(err));
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

export const setActiveTab = (value) => (dispatch) => {
    dispatch({
        type: SET_TAB,
        payload: value
    })
}