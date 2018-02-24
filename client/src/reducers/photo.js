import {
    UPLOAD_SUCCESS,
    FETCH_PHOTOS,
    DELETE_PHOTO
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case UPLOAD_SUCCESS:
            return { ...state, photos: [ ...state.photos.reverse(), action.payload.data ] }
        case FETCH_PHOTOS:
            return { ...state, photos: action.payload.data }
        case DELETE_PHOTO:
            return { ...state, photos: [...state.photos.filter(photo => photo._id !== action.payload.data._id)] }
        default:
            return state;
    }
}