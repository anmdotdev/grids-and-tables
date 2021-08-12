import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import HeroBanner from '../components/HeroBanner';
import ActionBar from '../components/ActionBar';

import Grid from '../components/Grid';
import Table from '../components/Table';

import { getCards, handleSearch, handleSorting } from '../store/cards/actions';

const Home = () => {
	const { currentData } = useSelector((state: any) => state.cards);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleSearch(localStorage.getItem('search') || ''));
		dispatch(handleSorting(localStorage.getItem('sortValue') || ''));
	}, []);

	return (
		<>
			<HeroBanner />
			<ActionBar />
			<Grid data={currentData} />
			<Table data={currentData} />
		</>
	);
};

Home.getInitialProps = ({ store }) => store.dispatch(getCards());

export default Home;
