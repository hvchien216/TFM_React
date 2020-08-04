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

export const setError = (error_message) => dispatch => {
	dispatch({
		type: SET_ERRORS,
		payload: error_message
	});
}

export const fetchProductDetail = (code) => async dispatch => {
	try {
		const res = await productApi.detail(code);
		const { success, error_message, data } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
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
		const { success, error_message, data } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
			history.push('/not-found');
			return;
		}
		return data;
	} catch (error) {
		console.log("Err==>", error);
	}
}