import React from 'react';

const isServer = typeof window === 'undefined';

const withRedux = (initializeStore, config) => {
	const { storeKey = '__NEXT_REDUX_STORE__' } = config;

	const getOrCreateStore = (initialState?) => {
		if (isServer) {
			return initializeStore(initialState);
		}

		if (!window[storeKey]) {
			window[storeKey] = initializeStore(initialState);
		}
		return window[storeKey];
	};

	return (App) => {
		type ReduxProps = { initialStore: any };

		const ReduxApp = (props: ReduxProps) => {
			const { initialStore } = props;
			return <App {...props} store={getOrCreateStore(initialStore)} />;
		};

		ReduxApp.getInitialProps = async (appContext) => {
			const store = getOrCreateStore();

			appContext.ctx.store = store;

			let appProps = {};
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps(appContext);
			}

			return { ...appProps, initialStore: store.getState() };
		};

		return ReduxApp;
	};
};

export default withRedux;
