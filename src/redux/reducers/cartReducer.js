import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, REMOVE_ALL_CART } from './../types';
import { savedYourCard } from './../../commons/utils';
const initialState = {
	cart: JSON.parse(localStorage.getItem('your_cart')) || [
		// { product_id: 1, img: thumb, name: "Domba - Trắng/Đen", quantity: 2, price: 990000, total: 100000, specification_id: 2 },
	],
}

export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART: {
			const indexOfProduct = state.cart.findIndex(ele => {
				return ele.product_id === action.payload.product_id;
			});
			// -1 hoac 0=>99999
			if (indexOfProduct >= 0) {
				const newCartState = [...state.cart];
				//copy mang state cart trong store
				newCartState[indexOfProduct].quantity =
					Number(newCartState[indexOfProduct].quantity) +
					Number(action.payload.quantity);
				savedYourCard(newCartState)
				return {
					...state,
					cart: newCartState
				};
			} else {
				savedYourCard([...state.cart, action.payload]);
				return {
					...state,
					cart: [...state.cart, action.payload]
				};
			}
		}
		case REMOVE_FROM_CART: {
			const newCartState = state.cart.filter(item => {
				return item.product_id !== action.product_id;
			});
			savedYourCard(newCartState);
			return {
				...state,
				cart: newCartState
			};
		}
		case UPDATE_CART_ITEM: {
			const newCartState = [...state.cart];
			const indexOfProduct = state.cart.findIndex(ele => {
				return ele.product_id === action.product_id;
			});
			newCartState[indexOfProduct].quantity = newCartState[indexOfProduct].quantity + action.quan;
			if (newCartState[indexOfProduct].quantity === 0) {
				const newCart = newCartState.filter(item => {
					return item.product_id !== action.product_id;
				});
				savedYourCard(newCart);
				return {
					...state,
					cart: newCart
				};
			}
			savedYourCard(newCartState);
			return {
				...state,
				cart: newCartState
			};
		}
		case REMOVE_ALL_CART: {
			savedYourCard([]);
			return {
				...state,
				cart: [],
			}
		}
		default:
			return state;
	}
}
