import {
	STOP_LOADING_UI,
	LOADING_UI,
	FETCHING_DATA
} from '../types';

export const showLoading = () => dispatch => {
	dispatch({
		type: LOADING_UI
	})
}
export const hideLoading = () => dispatch => {
	setTimeout(() => {
		dispatch({
			type: STOP_LOADING_UI
		})
	}, 700)
}

export const fetchingData = () => dispatch => {
	dispatch({
		type: FETCHING_DATA
	})
}