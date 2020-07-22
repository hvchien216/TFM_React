import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER,

} from './../types';
import userApi from './../../api/userApi';
export const signIn = (userData, history) => async dispatch => {
	dispatch({ type: LOADING_UI });
	try {
		const res = await userApi.login(userData);
		dispatch({ type: CLEAR_ERRORS });
		if (!res.success) {
			dispatch({
				type: SET_ERRORS,
				payload: res.messages
			});
			return;
		}
		savedToLocal({ user: res.user, token: res.token });
		dispatch({
			type: SET_USER,
			payload: res.user
		});
		history.push('/');

	} catch (error) {
		console.log('err==>', error)
	}
}

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const savedToLocal = data => {
	const { user, token } = data;
	const dataSaved = { user, token };
	localStorage.setItem('user', JSON.stringify(dataSaved));
}