import React from 'react';

import App from 'next/app';

import { Provider } from 'react-redux';

import GlobalStyles from '../common/GlobalStyles';
import Meta from '../common/Meta';

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
			<Provider store={store}>
				<Meta
					title="Grids and Tables - Responsive app built with React, TS, NextJS"
					description="A responsive grids and tables web application, built using React, TypeScript, NextJS, Redux, and Styled Components."
					author="Anmol Mahatpurkar"
					url="/"
				/>
				<GlobalStyles />
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default withStore(MyApp);
