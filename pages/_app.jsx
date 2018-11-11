import React from 'react';

import App, { Container } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import initStore from '../store';
import { setStoreState as setRouteStoreState } from '../store/route/actions';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {
      store, pathname, asPath, query = {},
    } = ctx;

    store.dispatch(setRouteStoreState({ pathname, asPath, query }));

    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...ctx })
      : {};
    const pageProps = {
      pathname,
      query,
      asPath,
      ...(initialProps || {}),
    };

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

export default withRedux(initStore)(MyApp);
