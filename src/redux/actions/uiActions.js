import {
	FETCHING_DATA,
	CLEAR_ERRORS,
	SET_ERRORS
} from '../types';
import productApi from '../../api/productApi';

export const fetchingData = () => dispatch => {
	dispatch({
		type: FETCHING_DATA
	})
}

export const setError = (error) => dispatch => {
	dispatch({
		type: SET_ERRORS,
		payload: error
	});
}

export const fetchProductDetail = (code, history) => async dispatch => {
	try {
		const res = await productApi.detail(code);
		const { success, error_message, data, error_code } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: { error_message, error_code }
			});
			history.push('/not-found');
			return;
		}
		return data;
	} catch (error) {
		console.log("Err==>", error);
	}
}

export const fetchListProduct = (query, history) => async dispatch => {
	try {
		const res = await productApi.list(query);
		const { success, error_message, error_code, data } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: { error_message, error_code }
			});
			history.push('/not-found');
			return;
		}
		return data;
	} catch (error) {
		console.log("Err==>", error);
	}
}