import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.grey[200],
		[ theme.breakpoints.down('xs') ]: {
			'& .MuiTypography-caption': {
				fontSize: 10,
			}
		}
	},
	panel:{
		display: 'flex',
		justifyContent: 'flex-end',

		'& span, a': {
			fontWeight: 700,
			color: theme.palette.secondary.dark
		}
	},
	copyRight: {
		[ theme.breakpoints.down('xs') ]: {
			fontSize: 10
		}
	}

}));

const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.root}>
			<Toolbar className={classes.panel}>
				<Typography variant='body1' component='p' align='right' className={classes.copyRight}>
					Icons made by <Box component='span'>Iconixar </Box> from <Box component='span'>
						<Link 
							href='https:\\www.flaticon.com'
							rel='noreferrer'
							target='_blank'
						>
							www.flaticon.com
						</Link>
					</Box>
				</Typography>
			</Toolbar>
		</footer>
	);
}

export default Footer;
