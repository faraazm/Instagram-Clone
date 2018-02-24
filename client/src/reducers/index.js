import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './auth';
import photoReducer from './photo';
import userReducer from './user';

export default combineReducers({
    form: reduxForm,
    auth: authReducer,
    photos: photoReducer,
    user: userReducer
});