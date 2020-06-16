import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, REMOVE_ALL_CART } from './../types';
import thumb from './../../assets/domba.jpg';
const initialState = {
    cart: [
        { id: 1, img: thumb, name: "Domba - Trắng/Đen", quantity: 2, price: 990000, },
        { id: 2, img: thumb, name: "Ananas Track 6 - Low To2p", quantity: 2, price: 1990000, },
        { id: 3, img: thumb, name: "Ananas Track  - Low ", quantity: 1, price: 990000, },
        { id: 4, img: thumb, name: "Ananas - Low Top", quantity: 4, price: 1990000, },
        { id: 5, img: thumb, name: "Ananas Track 6 - Top", quantity: 1, price: 90000, },
    ],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
            }
        case REMOVE_FROM_CART: {
            const newCartState = state.cart.filter(item => {
                return item.id !== action.id;
            });
            return {
                ...state,
                cart: newCartState
            };
        }
        case UPDATE_CART_ITEM: {
            const newCartState = [...state.cart];
            const indexOfProduct = state.cart.findIndex(ele => {
                return ele.id === action.id;
            });
            newCartState[indexOfProduct].quantity = newCartState[indexOfProduct].quantity + action.quan;
            if (newCartState[indexOfProduct].quantity === 0) {
                const newCart = newCartState.filter(item => {
                    return item.id !== action.id;
                });
                return {
                    ...state,
                    cart: newCart
                };
            }
            return {
                ...state,
                cart: newCartState
            };
        }
        case REMOVE_ALL_CART: {
            console.log("aaaaa")
            return {
                ...state,
                cart: [],
            }
        }
        default:
            return state;
    }
}
