import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
} from './../types';

export const signIn = (data, history) => dispatch => {
    console.log("qqqq==>", data)
    history.push('/');
    // dispatch({ type: LOGIN_SUCCESS });
    // dispatch({ type: LOGIN_ERROR, err });
}