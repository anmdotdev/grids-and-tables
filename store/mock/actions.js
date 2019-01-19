import { apiRequest } from '../../util/redux-utils';
import { apiTypes, syncTypes } from './_types';

export const getMockData = params => async (dispatch) => {
  await apiRequest({
    dispatch,
    actionType: apiTypes.GET_MOCK_DATA,
    apiType: 'get',
    path: '/mock.json',
    params,
    onSuccess: data => ({ data }),
    onFailure: messages => ({ messages }),
  });
};

export const handleSearch = searchString => ({ type: syncTypes.HANDLE_SEARCH, searchString });

export const handleSorting = sortValue => ({ type: syncTypes.HANDLE_SORTING, sortValue });

export const handlePageChange = page => ({ type: syncTypes.HANDLE_PAGE_CHANGE, page });

export const setStoreState = data => ({ type: syncTypes.SET_STORE_STATE, data });
