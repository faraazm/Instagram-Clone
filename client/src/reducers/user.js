import {
    FETCH_CURRENT_USER
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_CURRENT_USER:
            return { ...state, user: action.payload.data }
        default:
            return state;
    }
}