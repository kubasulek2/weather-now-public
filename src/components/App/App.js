import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Header, Footer } from '../Layout';
import Weather from '../../containers/Weather/Weather';


const useStyles = makeStyles(theme => ({
	app: {
		minHeight: '100vh'
	},
	'@global': {
		html: {
			fontSize: 14,
			[ theme.breakpoints.down('md') ]: {
				fontSize: 12
			}
		},
		'html, body, #root': {
			minHeight: '100vh',
		},
		'h1, h2, h3, h4, h5, h6': {
			color: theme.palette.grey[ 700 ]
		},
		'p, div, span': {
			color: theme.palette.grey[ 600 ]
		}
	}
}));

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.app}>
			<Header />
			<Weather />
			<Footer />
		</div>
	);
};

export default App;
