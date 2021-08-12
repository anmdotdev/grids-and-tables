import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Input from '../common/Input';
import Select from '../common/Select';

import { handleSearch, handleSorting } from '../store/cards/actions';

import breakpoint from '../util/breakpoint';

const sortOptions = [
	{ label: 'By Title - Ascending', value: 'title_ascending' },
	{ label: 'By Title - Descending', value: 'title_descending' },
	{ label: 'By Date - Ascending', value: 'date_ascending' },
	{ label: 'By Date - Descending', value: 'date_descending' },
];

const ActionBar = () => {
	const { searchString, sortValue } = useSelector((state: any) => state.cards);
	const dispatch = useDispatch();

	return (
		<Container>
			<Content>
				<Input
					id="search"
					name="search"
					type="text"
					label="Search"
					value={searchString}
					onChange={(e) => dispatch(handleSearch(e.target.value))}
					placeholder="Type and Search..."
					icon="/images/search.svg"
				/>
				<Select
					id="sort"
					name="sort"
					label="Sort"
					value={sortValue}
					onChange={(v) => dispatch(handleSorting(v))}
					placeholder="Sort By..."
					options={sortOptions}
					icon="/images/sort.svg"
				/>
			</Content>
		</Container>
	);
};

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

export default ActionBar;
