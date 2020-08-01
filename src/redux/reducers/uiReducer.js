import {
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	STOP_LOADING_UI,
	FETCHING_DATA
} from '../types';
import { alertError, uppercaseFirstCharater } from './../../commons/utils';
const initialState = {
	loading: false,
	isFetchingData: false,
	errors: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			alertError(uppercaseFirstCharater(action.payload));
			return {
				...state,
				loading: false,
				errors: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case LOADING_UI:
			return {
				...state,
				loading: true
			};
		case STOP_LOADING_UI:
			return {
				...state,
				loading: false
			};
		case FETCHING_DATA:
			return {
				...state,
				isFetchingData: !state.isFetchingData
			}
		default:
			return state;
	}
}