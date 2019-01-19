import { apiTypes, syncTypes } from './_types';

const initialState = {
  data: [],
  searchString: '',
  sortValue: '',

  page: 1,
  total: 0,

  pageSize: 6,

  requestStatus: {},
  messages: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case apiTypes.GET_MOCK_DATA:
      return {
        ...state,
        ...action.data,
        page: 1,
        total: Math.ceil(action.data.length / state.pageSize),
      };
    case syncTypes.HANDLE_SEARCH:
      return { ...state, searchString: action.searchString };
    case syncTypes.HANDLE_SORTING:
      return { ...state, sortValue: action.sortValue };
    case syncTypes.HANDLE_PAGE_CHANGE:
      return { ...state, page: action.page <= state.total ? action.page : state.page };
    case syncTypes.SET_STORE_STATE:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
