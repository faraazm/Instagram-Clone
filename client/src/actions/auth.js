import axios from 'axios';
import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_OUT_SUCCESS,
    REMOVE_ALERTS
} from './types';

export const signUp = values => async dispatch => {
    dispatch({ type: SIGN_UP_REQUEST });
    try {
        const res = await axios.post('/api/auth/signUp', values);
        dispatch({ type: SIGN_UP_SUCCESS, payload: res.data });
    } catch(err){
        dispatch({ type: SIGN_UP_FAILURE, payload: err });
    }
}

export const signIn = values => async dispatch => {
    dispatch({ type: SIGN_IN_REQUEST });
    try {
        const res = await axios.post('/api/auth/signIn', values);
        localStorage.setItem('token', res.data.token);
        dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
    } catch(err){
        dispatch({ type: SIGN_IN_FAILURE, payload: err });
    }
}

export const signOut = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: SIGN_OUT_SUCCESS });
}

export const removeAlerts = () => dispatch => {
    dispatch({ type: REMOVE_ALERTS });
}