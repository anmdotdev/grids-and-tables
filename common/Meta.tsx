import React from 'react';

import Head from 'next/head';

type MetaProps = {
	title: string;
	description: string;
	author?: string;
	url?: string;
};

const Meta: React.FC<MetaProps> = ({ title, description, author, url }) => (
	<Head>
		<title>{title}</title>

		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<meta key="title" name="title" content={title || ''} />
		<meta key="description" name="description" content={description || ''} />

		<meta key="author" name="author" content={author || ''} />

		<meta key="og:title" name="og:title" content={title || ''} />
		<meta key="og:description" name="og:description" content={description || ''} />

		<meta key="og:url" property="og:url" content={url || ''} />

		<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
		<link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#6c5ac0" />
		<link rel="manifest" href="/manifest.json" />

		<meta name="msapplication-TileColor" content="#603cba" />
		<meta name="theme-color" content="#603cba" />
	</Head>
);

export default Meta;
