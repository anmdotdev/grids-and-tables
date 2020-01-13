import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900,900i&display=swap');

	* {
		box-sizing: border-box;
	}
	*:before,
	*:after {
		box-sizing: border-box;
	}
	body {
		font-family: Lato, sans-serif;
		font-size: 14px;
		line-height: 1.6;
		width: auto !important;
		margin: 0;
		box-sizing: border-box;
		color: #202020;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	b,
	strong {
		font-weight: 700;
	}
`;

export default GlobalStyles;
