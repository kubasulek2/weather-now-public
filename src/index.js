import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, yellow, red } from '@material-ui/core/colors';

import App from './components/App/App';

import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
	palette: {
		type: 'light',
		background: {
			default: '#f6f8fb',
			paper: '#fff'
		},
		primary: {
			main: lightBlue[ 200 ],
			dark: lightBlue[ 500 ]
		},
		secondary: {
			main: yellow[ 400 ],
			dark: yellow[ 700 ]
		},
		error: { main: red.A200 },
		text: {
			primary: 'rgba(0,0,0,0.7)'
		}
	},
	typography: {
		fontFamily: [
			'Open Sans',
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif'
		].join(',')
	},
	spacing: 8,
	shape: {
		borderRadius: 4
	},
	shadows: [
		'none',
		'0px 1px 3px 0px rgba(0,0,0,0.09),0px 1px 2px 0px rgba(0,0,0,0.05),0px 2px 5px -1px rgba(0,0,0,0.3)',
		'0px 1px 5px 0px rgba(0,0,0,0.09),0px 2px 3px 0px rgba(0,0,0,0.05),0px 3px 7px -2px rgba(0,0,0,0.3)',
		'0px 1px 8px 0px rgba(0,0,0,0.09),0px 3px 4px 0px rgba(0,0,0,0.05),0px 3px 9px -2px rgba(0,0,0,0.3)',
		'0px 2px 4px -1px rgba(0,0,0,0.09),0px 4px 5px 0px rgba(0,0,0,0.05),0px 1px 10px 0px rgba(0,0,0,0.3)',
		'0px 3px 5px -1px rgba(0,0,0,0.09),0px 5px 8px 0px rgba(0,0,0,0.05),0px 1px 14px 0px rgba(0,0,0,0.3)',
		'0px 3px 5px -1px rgba(0,0,0,0.09),0px 6px 10px 0px rgba(0,0,0,0.05),0px 1px 18px 0px rgba(0,0,0,0.3)',
		'0px 4px 5px -2px rgba(0,0,0,0.09),0px 7px 10px 1px rgba(0,0,0,0.05),0px 2px 16px 1px rgba(0,0,0,0.3)',
		'0px 5px 5px -3px rgba(0,0,0,0.09),0px 8px 10px 1px rgba(0,0,0,0.05),0px 3px 14px 2px rgba(0,0,0,0.3)',
		'0px 5px 6px -3px rgba(0,0,0,0.09),0px 9px 12px 1px rgba(0,0,0,0.05),0px 3px 16px 2px rgba(0,0,0,0.3)',
		'0px 6px 6px -3px rgba(0,0,0,0.09),0px 10px 14px 1px rgba(0,0,0,0.05),0px 4px 18px 3px rgba(0,0,0,0.3)',
		'0px 6px 7px -4px rgba(0,0,0,0.09),0px 11px 15px 1px rgba(0,0,0,0.05),0px 4px 20px 3px rgba(0,0,0,0.3)',
		'0px 7px 8px -4px rgba(0,0,0,0.09),0px 12px 17px 2px rgba(0,0,0,0.05),0px 5px 22px 4px rgba(0,0,0,0.3)',
		'0px 7px 8px -4px rgba(0,0,0,0.09),0px 13px 19px 2px rgba(0,0,0,0.05),0px 5px 24px 4px rgba(0,0,0,0.3)',
		'0px 7px 9px -4px rgba(0,0,0,0.09),0px 14px 21px 2px rgba(0,0,0,0.05),0px 5px 26px 4px rgba(0,0,0,0.3)',
		'0px 8px 9px -5px rgba(0,0,0,0.09),0px 15px 22px 2px rgba(0,0,0,0.05),0px 6px 28px 5px rgba(0,0,0,0.3)',
		'0px 8px 10px -5px rgba(0,0,0,0.09),0px 16px 24px 2px rgba(0,0,0,0.05),0px 6px 30px 5px rgba(0,0,0,0.3)',
		'0px 8px 11px -5px rgba(0,0,0,0.09),0px 17px 26px 2px rgba(0,0,0,0.05),0px 6px 32px 5px rgba(0,0,0,0.3)',
		'0px 9px 11px -5px rgba(0,0,0,0.09),0px 18px 28px 2px rgba(0,0,0,0.05),0px 7px 34px 6px rgba(0,0,0,0.3)',
		'0px 9px 12px -6px rgba(0,0,0,0.09),0px 19px 29px 2px rgba(0,0,0,0.05),0px 7px 36px 6px rgba(0,0,0,0.3)',
		'0px 10px 13px -6px rgba(0,0,0,0.09),0px 20px 31px 3px rgba(0,0,0,0.05),0px 8px 38px 7px rgba(0,0,0,0.3)',
		'0px 10px 13px -6px rgba(0,0,0,0.09),0px 21px 33px 3px rgba(0,0,0,0.05),0px 8px 40px 7px rgba(0,0,0,0.3)',
		'0px 10px 14px -6px rgba(0,0,0,0.09),0px 22px 35px 3px rgba(0,0,0,0.05),0px 8px 42px 7px rgba(0,0,0,0.3)',
		'0px 11px 14px -7px rgba(0,0,0,0.09),0px 23px 36px 3px rgba(0,0,0,0.05),0px 9px 44px 8px rgba(0,0,0,0.3)',
		'0px 11px 15px -7px rgba(0,0,0,0.09),0px 24px 38px 3px rgba(0,0,0,0.05),0px 9px 46px 8px rgba(0,0,0,0.3)',
	]
});

const app = (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>
);



ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
