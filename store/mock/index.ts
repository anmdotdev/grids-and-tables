import { compareAsc, compareDesc } from 'date-fns';
import { API_STATUS } from '../../util/redux-utils';
import { apiTypes, syncTypes } from './_types';

const initialState = {
	page: 1,
	total: 0,

	pageSize: 6,

	currentData: [],
	searchString: '',
	sortValue: '',

	filteredData: [],
	allData: [],

	requestStatus: {},
	messages: {},
};

const getMockData = (state, action) => {
	const { pageSize } = state;
	const { apiStatus, data } = action;
	const { allData } = data || {};

	const newState = { ...state, ...data };

	if (apiStatus === API_STATUS.SUCCESS) {
		const filteredData = [...allData];
		const currentData = filteredData.slice(0, pageSize);

		return {
			...newState,
			currentData,
			filteredData,
			page: 1,
			total: Math.ceil(filteredData.length / pageSize),
		};
	}

	return newState;
};

const getSearchResults = (search, data) => {
	// Escaping Reserved Characters
	const searchRegEx = new RegExp(search.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'i');

	const newData = data.filter(
		({ name, description }) => searchRegEx.test(name) || searchRegEx.test(description),
	);

	return newData;
};

const getSortedResults = (sortValue, data, allData) => {
	let newData = [];

	switch (sortValue) {
		case 'title_ascending': {
			newData = data.sort((first, second) => {
				if (first.name > second.name) {
					return 1;
				}
				if (first.name < second.name) {
					return -1;
				}
				return 0;
			});
			break;
		}
		case 'title_descending': {
			newData = data.sort((first, second) => {
				if (first.name < second.name) {
					return 1;
				}
				if (first.name > second.name) {
					return -1;
				}
				return 0;
			});
			break;
		}
		case 'date_ascending': {
			newData = data.sort((first, second) =>
				compareAsc(new Date(first.date), new Date(second.date)),
			);
			break;
		}
		case 'date_descending': {
			newData = data.sort((first, second) =>
				compareDesc(new Date(first.date), new Date(second.date)),
			);
			break;
		}
		default: {
			newData = [...allData] || [...data];
			break;
		}
	}

	return newData;
};

const handleSearch = (state, action) => {
	const { pageSize, allData, sortValue } = state;
	const { searchString } = action;

	let newData = getSearchResults(searchString, allData);

	if (sortValue && sortValue !== '') {
		newData = getSortedResults(sortValue, newData);
	}

	const currentData = newData.slice(0, pageSize);

	return {
		...state,
		searchString,
		filteredData: newData,
		currentData,
		page: 1,
		total: Math.ceil(newData.length / pageSize),
	};
};

const handleSorting = (state, action) => {
	const { pageSize, filteredData, allData } = state;
	const { sortValue } = action;

	const newData = getSortedResults(sortValue, filteredData, allData);
	const currentData = newData.slice(0, pageSize);

	return {
		...state,
		sortValue,
		filteredData: newData,
		currentData,
		page: 1,
		total: Math.ceil(newData.length / pageSize),
	};
};

const handlePageChange = (state, action) => {
	const { pageSize, filteredData } = state;
	const { page } = action;

	return {
		...state,
		page,
		currentData: filteredData.slice((page - 1) * pageSize, page * pageSize),
	};
};

export default (state = initialState, action) => {
	switch (action.type) {
		case apiTypes.GET_MOCK_DATA:
			return getMockData(state, action);
		case syncTypes.HANDLE_SEARCH:
			return handleSearch(state, action);
		case syncTypes.HANDLE_SORTING:
			return handleSorting(state, action);
		case syncTypes.HANDLE_PAGE_CHANGE:
			return handlePageChange(state, action);
		case syncTypes.SET_STORE_STATE:
			return { ...state, ...action.data };
		default:
			return state;
	}
};
