import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import withRedux from './withRedux';

import mock from './mock';
import route from './route';

const enhancers = [];
const middleware = [thunk];

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
	}
}

const composeWithDevTools =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
	(process.env.NODE_ENV === 'development' || localStorage.getItem('redux_devtools_on'))
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

const initStore = (initialState = {}) => {
	const rootReducer = combineReducers({ mock, route });
	return createStore(rootReducer, initialState, composedEnhancers);
};

const withStore = withRedux(initStore, {});

export default withStore;
