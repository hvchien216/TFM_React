
import { ADD_TO_CART, SET_ERRORS, REMOVE_FROM_CART, UPDATE_CART_ITEM, REMOVE_ALL_CART, CLEAR_ERRORS } from './../types';
import { alertNotification } from '../../commons/utils';
import cartApi from './../../api/cartApi';


export const addToCart = (data) => (dispatch) => {
	dispatch({
		type: ADD_TO_CART,
		payload: data
	})
}

export const removeItemFromCart = (product_id) => (dispatch) => {
	dispatch({
		type: REMOVE_FROM_CART,
		product_id
	})
}

export const changeQuantityItemCart = (product_id, quan) => dispatch => {
	dispatch({
		type: UPDATE_CART_ITEM,
		product_id,
		quan
	})
}

export const removeAllItemCart = () => dispatch => {
	dispatch({
		type: REMOVE_ALL_CART
	})
}

export const orderAndCheckout = (data, history) => async dispatch => {
	try {
		const res = await cartApi.checkout(data);
		const { success, error_message } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: error_message
			});
			return;
		}
		dispatch(removeAllItemCart());
		history.push('/');
		alertNotification("Bạn đã đặt hàng thành công, vui lòng đợi xác nhận...")
	} catch (error) {
		console.log("Err==>", error);
	}
}