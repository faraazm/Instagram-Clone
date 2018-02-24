import axios from 'axios';
import {
    UPLOAD_SUCCESS,
    FETCH_PHOTOS,
    DELETE_PHOTO
} from './types';

export const uploadPhoto = (formData, userId) => async dispatch => {
    try {
        const upload = await axios.post(`/api/user/uploadImage/`, formData,
        { headers: { Authorization: localStorage.getItem('token') } });
        console.log(upload);
        dispatch({ type: UPLOAD_SUCCESS, payload: upload });
    } catch(err){
        console.log(err);
    }
}

export const fetchPhotos = () => async dispatch => {
    try {
        const photos = await axios.get(`/api/user/uploads`,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_PHOTOS, payload: photos });
    } catch(err){
        console.log(err);
    }
}

export const deletePhoto = (imageId) => async dispatch => {
    try {
        const deleteImage = await axios.delete(`/api/user/deleteImage/${imageId}`,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: DELETE_PHOTO, payload: deleteImage });
    } catch(err){
        console.log(err);
    }
}