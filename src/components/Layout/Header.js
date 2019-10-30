import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const useStyles = makeStyles(theme => ({
	root: {
		borderRadius: theme.spacing(.5),
		boxShadow: theme.shadows[ 1 ],
		fontWeight: 700,

		'& h5': {
			marginLeft: 5,
			fontSize: 24,
			color: theme.palette.grey[ 200 ],
			[ theme.breakpoints.down('xs') ]: {
				marginLeft: 2,
				fontSize: 18
			}
		}
	},
	toolbar: {
		justifyContent: 'space-between',
		[ theme.breakpoints.down('xs') ]: {
			paddingLeft: 10,
			paddingRight: 10,
		}
	},
	logoContainer: {
		width: 30,
		height: 30,
		transition: 'all .8s',
		[ theme.breakpoints.up('sm') ]: {
			width: 36,
			height: 36,
		}
	},
	logo: {
		width: '100%',
		height: '100%'
	},
	btn: {
		padding: 10,
		'&:hover div': {
			transform: 'scale(1.2)',
		},
		[ theme.breakpoints.down('xs') ]: {
			padding: 9
		}
	},
	copyRight: {
		color: theme.palette.grey[ 500 ],
		[ theme.breakpoints.down('xs') ]: {
			fontSize: 10
		},
		'& span, a': {
			color: theme.palette.secondary.main
		}
	}

}));


const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<Box display='flex' alignItems='center'>
					<IconButton aria-label="logo" href="index.html" className={classes.btn}>
						<div className={classes.logoContainer}>
							<Logo className={classes.logo} />
						</div>
					</IconButton>
					<Typography variant="h5">
						Weather Now
					</Typography>
				</Box>
				<Box>
					<Typography
						className={classes.copyRight}
						variant='body1'
						align='right'
					>
					made by <span> <b><Link href='http:\\www.kubasulek2.pl' target='_blank'>Kuba Sulkowski</Link></b></span>
					</Typography>
				</Box>
			</Toolbar>
		</AppBar >
	);
};

export default Header;