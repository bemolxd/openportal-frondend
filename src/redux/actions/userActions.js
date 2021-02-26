import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED, SET_TAB, DELETE_POST, MARK_NOTIFICATIONS_READ } from '../types';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios.post('/login', userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/');
            }).catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
};

export const signupUser = (newUserData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios.post('/signup', newUserData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/');
            }).catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('OpenPortalToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
    .then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
    }).catch((err) => console.error(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails).then(() => {
        dispatch(getUserData());
    }).catch((err) => console.error(err))
};

export const markNotificationsRead = (notificationsIds) => (dispatch) => {
    axios.post('/notifications', notificationsIds).then((res) => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        })
    }).catch((err) => console.error(err))
}

export const setLastOpenedTab = (lastTab) => (dispatch) => {
    dispatch({ type: SET_TAB })
    const LastOpenedTab = lastTab;
    localStorage.setItem('LastOpenedTab', LastOpenedTab);
};

const setAuthorizationHeader = (token) => {
    const OpenPortalToken = `Bearer ${token}`;
    localStorage.setItem('OpenPortalToken', OpenPortalToken);
    axios.defaults.headers.common['Authorization'] = OpenPortalToken;
};