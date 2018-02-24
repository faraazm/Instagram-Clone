import axios from 'axios';
import {
    FETCH_CURRENT_USER
} from './types';

export const fetchUser = () => async dispatch => {
    try {
        const user = await axios.get('/api/auth/currentUser',
        { headers: { Authorization: localStorage.getItem('token') } });
        console.log(user);
        dispatch({ type: FETCH_CURRENT_USER, payload: user });
    } catch(err){
        console.log(err);
    }
}