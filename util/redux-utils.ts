import axios from 'axios';

axios.defaults.baseURL = 'https://anmolmahatpurkar-fb5e5.firebaseio.com';

export const API_STATUS = {
	INITIATED: 'INITIATED',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE',
};

export const apiInitiate = async (type, dispatch, data = {}) =>
	dispatch({ type, apiStatus: API_STATUS.INITIATED, data: { ...data } });

export const apiSuccess = async (type, dispatch, data = {}) =>
	dispatch({ type, apiStatus: API_STATUS.SUCCESS, data: { ...data } });

export const apiFailure = async (type, dispatch, data = {}) =>
	dispatch({ type, apiStatus: API_STATUS.FAILURE, data: { ...data } });

export const apiMeta = (name, state, action) => {
	const requestStatus = { ...(state.requestStatus || {}) };
	const messages = { ...(state.messages || {}) };

	requestStatus[name] = action.apiStatus;
	messages[name] = (action.data.messages || []).join(', ');

	return { requestStatus, messages };
};

export const getMeta = (state, name) => ({
	isLoading:
		state.requestStatus[name] !== API_STATUS.SUCCESS &&
		state.requestStatus[name] !== API_STATUS.FAILURE,
	errors: state.messages[name],
});

export const apiRequest = async (config) => {
	const { path, apiType, params, actionType, dispatch, onInitiate, onSuccess, onFailure } = config;

	try {
		await apiInitiate(actionType, dispatch, onInitiate ? onInitiate() : null);
		const response = await axios[apiType](path, params);
		const { status, data } = response;

		if (status === 200) {
			apiSuccess(actionType, dispatch, onSuccess ? onSuccess(data, response) : null);
		} else {
			apiFailure(
				actionType,
				dispatch,
				onFailure ? onFailure('Some Error Occurred', data, response) : null,
			);
		}
	} catch (error) {
		apiFailure(actionType, dispatch, onFailure([error.toString()]));
	}
};
