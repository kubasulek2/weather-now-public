import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({palette}) => ({
	btn: {
		'& .MuiButton-label': {
			color: palette.grey[ 100 ]
		}
	}
}));
const ForecastBtn = ({ clicked, text }) => {
	const classes = useStyles();
	return (
		<Button
			color='primary'
			onClick={clicked}
			variant='contained'
			className={classes.btn}
			size='large'
		>
			{text}
		</Button>
	);
};

export default ForecastBtn;
