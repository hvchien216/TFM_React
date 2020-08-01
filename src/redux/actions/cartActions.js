
import { ADD_TO_CART, SET_ERRORS, REMOVE_FROM_CART, UPDATE_CART_ITEM, REMOVE_ALL_CART, CLEAR_ERRORS } from './../types';
import { dataJsonProvince } from '../../commons/utils';
import cartApi from './../../api/cartApi';
// export const loginUser = (userData) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios.post('/login', userData)
//         .then(res => {
//             const FBIToken = `Bearer ${res.data.token}`;
//             localStorage.setItem('FBIToken', FBIToken);
//             axios.default.headers.common['Authorization'] = FBIToken;
//             dispatch(getUserData());
//             dispatch({ type: CLEAR_ERRORS });
//             history.push('/');
//         })
//         .catch(err => {
//             dispatch({
//                 type: SET_ERRORS,
//                 payload: err.response.data
//             })
//         });
// }

export const addToCart = (data) => (dispatch) => {
	dispatch({
		type: ADD_TO_CART,
		payload: data
	})
}

export const removeItemFromCart = (id) => (dispatch) => {
	dispatch({
		type: REMOVE_FROM_CART,
		id
	})
}

export const changeQuantityItemCart = (id, quan) => dispatch => {
	dispatch({
		type: UPDATE_CART_ITEM,
		id,
		quan
	})
}

export const removeAllItemCart = () => dispatch => {
	dispatch({
		type: REMOVE_ALL_CART
	})
}

export const orderAndCheckout = data => async dispatch => {
	try {
		const res = await cartApi.checkout(data);
		const { success, error_message } = res;
		console.log("Res checkout===>", res);
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