import React from 'react';
import { ArrowIcon } from '../../assets/icons/indicators';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(({ palette, breakpoints }) => ({
	root: ({ size, deg }) => ({
		width: size === 'big' ? 27 : 18,
		height: size === 'big' ? 27 : 18,
		marginRight: 4,
		color: palette.primary.main,
		transform: `rotate(${ deg }deg)`,
		[ breakpoints.down('xs') ]: {
			width: size === 'big' ? 21 : 14,
			height: size === 'big' ? 21 : 14,

		}
	}),
	icon: {
		width: '100%',
		height: '100%'
	}
}));

const DirectionIcon = ({ direction, size }) => {
	const classes = useStyles({ deg: direction });
	return (
		<div className={classes.root}>
			<ArrowIcon className={classes.icon} />
		</div>
	);
};

export default DirectionIcon;
