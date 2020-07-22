import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
export const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	ui: uiReducer,
})
