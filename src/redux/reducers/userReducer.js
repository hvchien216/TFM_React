import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	EDIT_PROFILE
} from './../types';

let userLocal = JSON.parse(localStorage.getItem('user'));

const initialState = {
	credentials: userLocal ? userLocal.user : {},
	authenticated: userLocal ? true : false,
	loading: false,
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case SET_UNAUTHENTICATED:
			return {
				credentials: {},
				authenticated: false,
				loading: false,
			};
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				credentials: { ...action.payload },
			};
		case LOADING_USER:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}

}