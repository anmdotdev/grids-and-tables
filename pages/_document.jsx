import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import Meta from '../common/meta';

export default class MyDocument extends Document {
  static getInitialProps({ pathname, renderPage, isServer }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
      pathname,
      isServer,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <Meta
            title="Grids and Tables"
            description="Grids and Tables - Responsive app built with React, NextJS"
            keywords="react,redux,nextjs,styled-components"
            author="Anmol"
            url="/"
          />
          <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
          <link href="/static/css/main.css" rel="stylesheet" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
