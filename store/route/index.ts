import { syncTypes } from './_types';

const initialState = {
	query: {},
	pathname: '',
};

const routeReducer = (state = initialState, action) => {
	switch (action.type) {
		case syncTypes.SET_STORE_STATE:
			return { ...state, ...action.data };
		default:
			return state;
	}
};

export default routeReducer;
