import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import {
	PressureIcon,
	HumidityIcon,
	SunsetIcon,
	WarmIcon,
	WindIcon,
	SnowIcon,
	RainIcon
} from '../../assets/icons/indicators';
import WeatherIcon from './WeatherIcon';
import DirectionIcon from '../UI/DirectionIcon';
import ForecastBtn from '../UI/Buttons/ForecastBtn';
import { processData } from '../../utility/utils';
import { AppContext, FnContext } from '../../context';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {
		marginTop: spacing(3),
		[ breakpoints.down('md') ]: {
			marginTop: spacing(2),
		}
	},
	card: {
		width: '100%',
	},
	cardHeader: {
		padding: `8px ${ spacing(2) }px`,
		display: 'flex',
		justifyContent: 'space-between',
		background: palette.grey[ 100 ],
		borderRadius: 4,
		border: '1px solid ' + palette.grey[ 300 ]
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
		[ breakpoints.down('xs') ]: {
			fontSize: 16
		}
	},
	'country': {
		fontWeight: 700,
		color: palette.primary.main
	},
	date: {
		fontWeight: 700,
		color: palette.primary.main
	},
	temperature: {
		[ breakpoints.down('xs') ]: {
			fontSize: 28
		}
	},
	parenthesis: {
		color: palette.grey[ 500 ]
	},
	iconContainer: {
		marginLeft: 10,
		width: 50,
		height: 50,
		[ breakpoints.down('xs') ]: {
			marginLeft: 6,
			width: 40,
			height: 40,

		}
	},
	cardContent: {
		paddingBottom: 0,
		[ breakpoints.down('xs') ]: {
			padding: 8,
			paddingBottom: 0,
		}
	},
	list: {
		padding: 0,
		'& .MuiListItem-root': {
			padding: '.5rem'
		},
		'& .MuiListItem-root:nth-child(even)': {
			background: '#f3f3f3'
		}
	},
	'MuiListItemText-primary': {
		fontWeight: 700

	},
	avatar: {
		background: 'transparent',
		width: 50,
		height: 50,
		[ breakpoints.down('xs') ]: {
			width: 40,
			height: 40,
		}
	},
	icon: {
		width: '80%',
		height: '80%',

	},
	display: {
		color: palette.grey[ 700 ],
		[ breakpoints.down('xs') ]: {
			fontSize: 16
		}
	},
	ornament: {
		color: palette.grey[ 500 ],
	},
	units: {
		color: palette.grey[ 500 ],
		fontSize: '1.1rem'
	},
	cardAction: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 16,
		paddingTop: 8
	},
}));

const WeatherMain = () => {
	const classes = useStyles();
	const { weatherData, transition, forecastData } = useContext(AppContext);
	const { handleForecastReq, handleForecastClose } = useContext(FnContext);
	const { calcLocalTime } = processData;
	const {
		humidity,
		pressure,
		sunrise,
		sunset,
		temp_max,
		temp_min,
		wind,
		rain,
		snow,
		name,
		temp,
		country,
		weather,
		clouds,
		time,
		timezone
	} = weatherData ? weatherData[ 0 ] : {};

	const [ localTime, updateLocalTime ] = useState(null);

	useEffect(() => {
		if (timezone) updateLocalTime(calcLocalTime(new Date().getTime(), timezone));
		const timer = setInterval(updateLocalTime(calcLocalTime(new Date().getTime(), timezone)), 20000);
		return () => clearInterval(timer);
	}, [ timezone, calcLocalTime ]);


	const rainItem = (
		rain
			? <ListItem>
				<ListItemAvatar>
					<Avatar className={classes.avatar}>
						<RainIcon className={classes.icon} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					className={classes.listText}
					primary={<b>Rain:</b>}
					secondary='Hour'
				/>
				<Typography variant='h5' className={classes.display}>
					{rain}<span className={classes.units}>mm</span>
				</Typography>
			</ListItem>
			: null
	);
	const snowItem = (
		snow
			? <ListItem>
				<ListItemAvatar>
					<Avatar className={classes.avatar}>
						<SnowIcon className={classes.icon} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					className={classes.listText}
					primary={<b>Snow:</b>}
					secondary='Hour'
				/>
				<Typography variant='h5' className={classes.display}>
					{snow}<span className={classes.units}>mm</span>
				</Typography>
			</ListItem>
			: null
	);

	const button = (
		forecastData
			? <ForecastBtn
				clicked={handleForecastClose}
				text='Hide Forecast'
			/>
			: <ForecastBtn
				text='Load Forecast'
				clicked={handleForecastReq}
			/>
	);

	return (
		weatherData
			? <Grid item xs={12} className={classes.root}>
				<Grow in={transition} timeout={600}>
					<Card className={classes.card}>
						<Box className={classes.cardHeader}>
							<Box className={classes.leftPanel}>
								<Typography
									className={classes.city}
									variant='h5'
								>
									{name.toUpperCase()} <span className={classes.parenthesis}>
										(</span><span className={classes.country}>{country}</span>
									<span className={classes.parenthesis}>)</span>
								</Typography>
								<Typography
									variant='subtitle1'
									noWrap={true}
								>
									<span className={classes.date}>{localTime}</span> / {weather.main}
								</Typography>
							</Box>

							<Box className={classes.rightPanel}>
								<Typography variant='h3' className={classes.temperature}>{temp.toFixed()}</Typography>
								<Typography variant='h6'><sup>&deg;C</sup></Typography>
								<Box className={classes.iconContainer}>
									<WeatherIcon
										clouds={clouds.all}
										weather={weather.main}
										time={time}
										sunrise={sunrise}
										sunset={sunset}
									/>
								</Box>
							</Box>
						</Box>
						<CardContent className={classes.cardContent}>
							<List className={classes.list}>
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<WarmIcon className={classes.icon} />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										className={classes.listText}
										primary={<b>Temperature:</b>}
										secondary='Min / Max'
									/>
									<Typography variant='h5' className={classes.display}>
										{temp_min} <span className={classes.ornament}>/</span> {temp_max}<span className={classes.units}>&deg;C</span>
									</Typography>
								</ListItem>
								{rainItem}
								{snowItem}
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<WindIcon className={classes.icon} />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										className={classes.listText}
										primary={<b>Wind:</b>} secondary='Direction / Speed'
									/>
									<DirectionIcon direction={wind.deg} size='big' />
									<Typography variant='h5' className={classes.display}>
										<span className={classes.ornament}>/</span> {wind.speed}<span className={classes.units}>ms</span>
									</Typography>

								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<SunsetIcon className={classes.icon} />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										className={classes.listText}
										primary={<b>Daytime:</b>} secondary='Sunrise / Sunset'
									/>
									<Typography variant='h5' className={classes.display}>
										{sunrise} <span className={classes.ornament}>/</span> {sunset}
									</Typography>
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<HumidityIcon className={classes.icon} />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										className={classes.listText}
										primary={<b>Humidity:</b>} secondary='Percentage'
									/>
									<Typography variant='h5' className={classes.display}>
										{humidity}<span className={classes.units}>%</span>
									</Typography>
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<PressureIcon className={classes.icon} />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										className={classes.listText}
										primary={<b>Pressure:</b>} secondary=' hPa'
									/>
									<Typography variant='h5' className={classes.display}>
										{pressure}<span className={classes.units}>hPa</span>
									</Typography>
								</ListItem>
							</List>
						</CardContent>
						<CardActions className={classes.cardAction}>
							{button}
						</CardActions>
					</Card>
				</Grow>
			</Grid>
			: null
	);
};

export default WeatherMain;
