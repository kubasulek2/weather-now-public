import React, { useState, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import WeatherIcon from './WeatherIcon';
import { scrollToTop, processData } from '../../utility/utils';
import { FnContext } from '../../context';



const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '.6rem',
	},
	paper: {
		padding: `8px ${ theme.spacing(1.5) }px`,
		display: 'flex',
		justifyContent: 'space-between',
		transition: 'all ease .4s',
		cursor: 'pointer',
		'&:hover': {
			boxShadow: theme.shadows[ 5 ]
		}
	},
	leftPanel: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: 20
	},
	rightPanel: {
		display: 'flex',
		alignItems: 'center',
	},
	city: {
		[ theme.breakpoints.down('sm') ]: {
			fontSize: 16
		}
	},
	'country': {
		fontWeight: 700,
		color: theme.palette.primary.main
	},
	date: {
		fontWeight: 700,
		color: theme.palette.primary.main
	},
	temperature: {
		[ theme.breakpoints.down('sm') ]: {
			fontSize: 28
		}
	},
	parenthesis: {
		color: theme.palette.grey[ 500 ]
	},
	iconContainer: {
		marginLeft: 10,
		width: 50,
		height: 50,
		[ theme.breakpoints.down('md') ]: {
			marginLeft: 6,
			width: 40,
			height: 40,

		}
	}
}));


const WeatherItem = ({ data, clicked, time }) => {
	const classes = useStyles();

	const [ checked, setChecked ] = useState(true);
	const { setTransition } = useContext(FnContext);
	
	const localTime = processData.calcLocalTime(time, data.timezone);
	const handleClick = () => {
		setTransition(false);
		setChecked();
		setTimeout(clicked, 1000);
		scrollToTop(600, 65, 400);
	};
	return (
		<Grow in={checked} timeout={800}>
			<Grid
				item
				xs={12}
				className={classes.root}
				onClick={handleClick}
			>
				<Paper className={classes.paper}>
					<Box className={classes.leftPanel}>
						<Typography
							className={classes.city}
							variant='h5'
						>
							{data.name.toUpperCase()} <span className={classes.parenthesis}>
								(</span><span className={classes.country}>{data.country}</span>
							<span className={classes.parenthesis}>)</span>
						</Typography>
						<Typography
							variant='subtitle1'
							noWrap={true}
						>
							<span className={classes.date}>{localTime}</span> / {data.weather.main}
						</Typography>
					</Box>

					<Box className={classes.rightPanel}>
						<Typography variant='h3' className={classes.temperature}>{data.temp.toFixed()}</Typography>
						<Typography variant='h6'><sup>&deg;C</sup></Typography>
						<Box className={classes.iconContainer}>
							<WeatherIcon
								clouds={data.clouds.all}
								weather={data.weather.main}
								time={data.time}
								sunrise={data.sunrise}
								sunset={data.sunset}
							/>
						</Box>
					</Box>
				</Paper>
			</Grid>
		</Grow>
	);
};
export default WeatherItem;
