import userApi from './../../api/userApi';
import { alertNotification } from './../../commons/utils';
import {
	CLEAR_ERRORS,
	SET_ERRORS,
	SET_UNAUTHENTICATED,
	SET_USER
} from './../types';
export const signInAndUp = (userData, history, isSignUp) => async dispatch => {
	// isSignUp = true: Sign Up
	// isSignUp = false: Sign In

	try {
		let res = isSignUp ? await userApi.register(userData) : await userApi.login(userData);
		const { data, success, error_message } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
			return;
		}
		let resInfo = await userApi.getInfo(data.access);
		const { email, first_name, last_name, phone, default_shipping_address: { address }, avatar } = resInfo?.data;
		let user = {
			name: first_name + ' ' + last_name,
			first_name,
			last_name,
			email,
			phone,
			address,
			avatar
		}
		savedToLocal({ user, token: data.access });
		dispatch({
			type: SET_USER,
			payload: user
		});
		history.push('/');
		alertNotification("Đăng nhập thành công");
	} catch (error) {
		console.log('err==>', error)
	}
}

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const editProfile = (dataInfoUser, history) => async dispatch => {
	const { firstName,
		lastName,
		phone,
		default_shipping_address: { address },
		avatar: {
			file,
			isTouch
		} } = dataInfoUser;
	const formData = new FormData();
	if (isTouch) {
		formData.append('avatar', file, file.name);
	}
	formData.append('phone', phone);
	formData.append('first_name', firstName);
	formData.append('last_name', lastName);
	formData.append('address', address);

	try {
		const res = await userApi.updateProfile(formData);
		const { data, success, error_message } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
			return;
		}
		const token = getTokenFromLocal();
		const { email, first_name, last_name, phone, address, avatar } = data;
		let user = {
			name: first_name + ' ' + last_name,
			first_name,
			last_name,
			email,
			phone,
			address,
			avatar
		}
		savedToLocal({ user, token });
		dispatch({
			type: SET_USER,
			payload: user
		});
		history.push('/account');
	} catch (error) {
		console.log("Err==>", error);
	}
}

export const changePassword = (data, history) => async dispatch => {
	try {
		const res = await userApi.changePassword(data);
		const { success, error_message } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
			return;
		}
		alertNotification("Đổi mật khẩu thành công");
		history.push('/');
	} catch (error) {
		console.log("Err==>", error);
	}
}

export const resetPassword = (data) => async dispatch => {
	try {
		const res = await userApi.resetPassword(data);
		const { success, error_message } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
			return;
		}
	} catch (error) {
		console.log("Err==>", error);
	}
}

export const fetchYourOrder = () => async dispatch => {
	try {
		const res = await userApi.yourOrder();
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

export const fetchYourOrderDetail = (code, history) => async dispatch => {
	try {
		const res = await userApi.yourOrderDetail(code);
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

export const savedToLocal = data => {
	const { user, token } = data;
	const dataSaved = { user, token };
	localStorage.setItem('user', JSON.stringify(dataSaved));
}

export const getTokenFromLocal = () => {
	const { token } = JSON.parse(localStorage.getItem('user'));
	return token;
}