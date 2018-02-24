import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_OUT_SUCCESS,
    REMOVE_ALERTS
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case SIGN_IN_REQUEST:
            return { ...state, signingIn: true }
        case SIGN_UP_REQUEST:
            return { ...state, signingUp: true }
        case SIGN_IN_SUCCESS:
            return { ...state, authenticated: true }
        case SIGN_UP_SUCCESS:
            return { ...state, alert: { message: 'User successfully registered.', color: 'green' } }
        case SIGN_UP_FAILURE:
            return { ...state, alert: { message: 'There was an error in registering your user. Please try again later.', color: 'red' } }
        case SIGN_IN_FAILURE:
            return { ...state, alert: { message: 'Oops! We could not find any matching records for the information you have provided. Please try again.', color: 'red' }  }
        case SIGN_OUT_SUCCESS:
            return { ...state, authenticated: false }
        case REMOVE_ALERTS:
            return { ...state, alert: null }
        default:
            return state
    }
}