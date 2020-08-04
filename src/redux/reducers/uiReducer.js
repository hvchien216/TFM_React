import {
	SET_ERRORS,
	CLEAR_ERRORS,
	FETCHING_DATA
} from '../types';
import { alertError, uppercaseFirstCharater } from './../../commons/utils';
const initialState = {
	isFetchingData: false,
	errors: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			alertError(uppercaseFirstCharater(action.payload));
			return {
				...state,
				isFetchingData: false,
				errors: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: null,
				isFetchingData: false,
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