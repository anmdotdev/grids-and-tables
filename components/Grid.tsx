import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Card from '../common/Card';
import Pagination from '../common/Pagination';

import { handlePageChange } from '../store/cards/actions';

import breakpoint from '../util/breakpoint';

type DataItem = {
	name?: string;
	image?: string;
	description?: string;
	date?: string;
};

type GridProps = {
	data?: DataItem[];
};

const Grid: React.FC<GridProps> = ({ data }) => {
	const { page, total } = useSelector((state) => state.cards);
	const dispatch = useDispatch();

	return (
		<Container>
			{data && (
				<Content>
					{data.map((card: DataItem, id) => (
						<Card key={id} {...card} />
					))}
				</Content>
			)}
			{(data ?? []).length === 0 && <h3>No Data Available for the Selected Settings</h3>}
			<Pagination page={page} total={total} onChange={(v) => dispatch(handlePageChange(v))} />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px 10px;
	padding-bottom: 10px;
`;

const Content = styled.div`
	width: 75%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	& > * {
		margin: 25px 30px;
	}

	@media (max-width: ${breakpoint.LG}px) {
		width: 85%;
	}

	@media (max-width: ${breakpoint.SM}px) {
		width: 95%;
	}
`;

export default Grid;
