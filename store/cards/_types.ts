const reducerName = 'cards';

export const apiTypes = {
	GET_CARDS: `${reducerName}/Get Cards Data`,
};

export const syncTypes = {
	HANDLE_SEARCH: `${reducerName}/Handle Search`,
	HANDLE_SORTING: `${reducerName}/Handle Sorting`,

	HANDLE_PAGE_CHANGE: `${reducerName}/Handle Page Change`,

	SET_STORE_STATE: `${reducerName}/Set Store State`,
};
