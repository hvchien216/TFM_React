import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
const initialState = {};

const middleware = [thunk];

// const middleware = [
//     applyMiddleware(middlewarethunk),
//     ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
// ]

const store = createStore(
    rootReducer,
    initialState,
    // compose(...middleware)
    compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;