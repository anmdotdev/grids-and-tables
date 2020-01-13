import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import Input from '../common/input';
import Select from '../common/select';

import { handleSearch, handleSorting } from '../store/mock/actions';

import breakpoint from '../util/breakpoint';

const sortOptions = [
	{ label: 'By Title - Ascending', value: 'title_ascending' },
	{ label: 'By Title - Descending', value: 'title_descending' },
	{ label: 'By Date - Ascending', value: 'date_ascending' },
	{ label: 'By Date - Descending', value: 'date_descending' },
];

const ActionBar = ({
	searchString,
	sortValue,
	handleSearch: handleSearchAction,
	handleSorting: handleSortingAction,
}) => (
	<Container>
		<Content>
			<Input
				type="text"
				value={searchString}
				onChange={(e) => handleSearchAction(e.target.value)}
				placeholder="Type and Search..."
				icon="/static/images/search.svg"
			/>
			<Select
				value={sortValue}
				onChange={handleSortingAction}
				placeholder="Sort By..."
				options={sortOptions}
				icon="/static/images/sort.svg"
			/>
		</Content>
	</Container>
);

const Container = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 35px;
`;

const Content = styled.div`
	width: 64%;
	display: flex;
	justify-content: space-between;

	@media (max-width: ${breakpoint.MD - 1}px) {
		width: 90%;
		flex-direction: column;
	}
`;

const mapStateToProps = ({ mock: { searchString, sortValue } }) => ({ searchString, sortValue });

ActionBar.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	handleSorting: PropTypes.func.isRequired,
	searchString: PropTypes.string,
	sortValue: PropTypes.string,
};

ActionBar.defaultProps = {
	searchString: '',
	sortValue: '',
};

export default connect(mapStateToProps, { handleSearch, handleSorting })(ActionBar);
