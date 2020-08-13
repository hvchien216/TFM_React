import {
	SET_ERRORS,
	CLEAR_ERRORS,
	FETCHING_DATA,
	SET_ROUTE_NAVBAR
} from '../types';
import { alertError, uppercaseFirstCharater } from './../../commons/utils';
const initialState = {
	routeNavbar: [],
	isFetchingData: false,
	errors: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			if (action.payload.error_code === 'token_not_valid')
				alertError(uppercaseFirstCharater("Phiên sử dụng của bạn đã hết hạn, vui lòng đăng nhập lại"));
			else
				alertError(uppercaseFirstCharater(action.payload.error_message));
			return {
				...state,
				isFetchingData: false,
				errors: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: null,
			};
		case FETCHING_DATA:
			return {
				...state,
				isFetchingData: !state.isFetchingData
			}
		case SET_ROUTE_NAVBAR:
			return {
				...state,
				routeNavbar: action.payload
			}
		default:
			return state;
	}
}