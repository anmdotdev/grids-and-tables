import { syncTypes } from './_types';

const initialState = {
	query: {},
	pathname: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case syncTypes.SET_STORE_STATE:
			return { ...state, ...action.data };
		default:
			return state;
	}
};
