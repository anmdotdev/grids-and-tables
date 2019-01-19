import { createSelector } from 'reselect';
import { compareAsc, compareDesc } from 'date-fns';

export const getSearchString = state => state.searchString;

export const getSortValue = state => state.sortValue;

export const getPage = state => state.page;

export const getTotal = state => state.total;

const getRawData = state => state.data;

const getSearchFilteredData = createSelector(
  [getSearchString, getRawData],
  (searchString, data) => {
    const searchRegEx = new RegExp(searchString.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'i');
    return data.filter(
      ({ name, description }) => searchRegEx.test(name) || searchRegEx.test(description),
    );
  },
);

const getSortedData = createSelector(
  [getSearchFilteredData, getSortValue],
  (data, sortValue) => {
    switch (sortValue) {
      case 'title_ascending': {
        return data.sort((first, second) => {
          if (first.name > second.name) {
            return 1;
          }
          if (first.name < second.name) {
            return -1;
          }
          return 0;
        });
      }
      case 'title_descending': {
        return data.sort((first, second) => {
          if (first.name < second.name) {
            return 1;
          }
          if (first.name > second.name) {
            return -1;
          }
          return 0;
        });
      }
      case 'date_ascending': {
        return data.sort(({ date: f }, { date: s }) => compareAsc(new Date(f), new Date(s)));
      }
      case 'date_descending': {
        return data.sort(({ date: f }, { date: s }) => compareDesc(new Date(f), new Date(s)));
      }
      default: {
        return data;
      }
    }
  },
);

export const getData = createSelector(
  [getSortedData, getPage],
  (sortedData, page) => sortedData.slice((page - 1) * 6, page * 6),
);
