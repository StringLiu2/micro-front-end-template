import { combineReducers } from 'redux';
import userReducer, { initialUserState } from './user';

export const initialState = {
    user: initialUserState
};
export default combineReducers({
    user: userReducer
});