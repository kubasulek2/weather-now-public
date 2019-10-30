import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Loader from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
		margin: '0 auto',
	},
	spinner: {
		color: theme.palette.secondary.dark,
	}
}));

const Spinner = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Loader className={classes.spinner} size={70} />
		</div>);
};

export default Spinner;
