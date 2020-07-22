import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

const middleware = [thunk];

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			shouldHotReload: false,
		})
		: compose;

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(...middleware)
	)
);

export default store;