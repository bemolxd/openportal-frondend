import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LIKE_POST, UNLIKE_POST, DELETE_POST, MARK_NOTIFICATIONS_READ } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload,
                loading: false
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        postID: action.payload.postID
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter((like) => like.postID !== action.payload.postID)
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((not) => not.read = true);
            return {
                ...state
            }
        default:
            return state;
    }
}