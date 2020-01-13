import React from 'react';

import App, { Container } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';

import withStore from '../store';
import { setStoreState as setRouteStoreState } from '../store/route/actions';

type AppProps = { store: any };

class MyApp extends App<AppProps> {
	static async getInitialProps({ Component, ctx }) {
		const { store, pathname, asPath, query = {} } = ctx;

		store.dispatch(setRouteStoreState({ pathname, asPath, query }));

		const initialProps = Component.getInitialProps
			? await Component.getInitialProps({ ...ctx })
			: {};

		const pageProps = { pathname, query, asPath, ...(initialProps || {}) };
		return { pageProps };
	}

	render() {
		const { Component, pageProps = {}, store } = this.props;

		return (
			<Container>
				<Head>
					<title>Grids and Tables - Responsive app built with React, NextJS</title>
				</Head>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default withStore(MyApp);
