import React from 'react';

import { createMuiTheme, ThemeProvider as Provider } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#f15d68',
			contrastText: '#fff',
		},
		secondary: {
			// light: "#ff7961",
			main: '#7a0811',
			// dark: "#ba000d",
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: `'Poppins', sans-serif`,
		fontSize: 14,
	},
});

const ThemeContext = (props) => {
	return <Provider theme={theme}>{props.children}</Provider>;
};

export default ThemeContext;
