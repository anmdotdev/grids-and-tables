import React from 'react';

const Meta = ({ title, description, author, url }) => (
	<>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<meta key="title" name="title" content={title || ''} />
		<meta key="description" name="description" content={description || ''} />

		<meta key="author" name="author" content={author || ''} />

		<meta key="og:title" name="og:title" content={title || ''} />
		<meta key="og:description" name="og:description" content={description || ''} />

		<meta key="og:url" property="og:url" content={url || ''} />

		<link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png" />
		<link rel="manifest" href="/static/images/site.webmanifest" />
		<link rel="mask-icon" href="/static/images/safari-pinned-tab.svg" color="#6c5ac0" />
		<meta name="msapplication-TileColor" content="#603cba" />
		<meta name="theme-color" content="#ffffff" />
	</>
);

export default Meta;