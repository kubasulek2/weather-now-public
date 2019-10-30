import React, { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ForecastTemp from './ForecastTemp';
import ForecastFall from './ForecastFall';
import ForecastHumidity from './ForecastHumidity';
import ForecastBtn from '../UI/Buttons/ForecastBtn';
import { AppContext, FnContext } from '../../context';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {
		marginTop: spacing(3),
		[breakpoints.down('md')]: {
			marginTop: spacing(2),
		}
	},
	card: {
		width: '100%',
		overflowX: 'auto',
	},
	cardHeader: {
		padding: spacing(2),
		background: palette.grey[ 100 ],
		borderRadius: 4,
		border: '1px solid ' + palette.grey[ 300 ],
		color: palette.grey[ 400 ],
		'& span': {
			fontWeight: 700,
			color: palette.grey[ 600 ],
		}
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'center',
	},
	listItem: {
		overflowX: 'auto',
		'&:not(:first-child)': {
			marginTop: '1.4rem'
		}
	}
}));
const ForecastMain = () => {
	const classes = useStyles();
	const { transition, forecastData: { name, list } } = useContext(AppContext);
	const { handleForecastClose } = useContext(FnContext);
	const data = list.filter((_, i) => i < 23);

	const main = data.map(el => ({
		date: el.date,
		time: el.time,
		temp: el.temp,
		pressure: el.pressure,
		wind: el.wind.speed,
		direction: el.wind.deg
	}));
	const fall = data.map(el => ({
		date: el.date,
		time: el.time,
		rain: el.rain ? Number(el.rain) : 0,
		snow: el.snow ? Number(el.snow) : 0,
	}));
	const humidity = data.map(el => ({
		date: el.date,
		time: el.time,
		humidity: el.humidity,
		clouds: el.clouds
	}));

	const isFall = fall.reduce((prev, {rain, snow}) => prev + rain + snow ,0);
	
	return (
		<Grid item xs={12} className={classes.root}>
			<Grow in={transition} timeout={600}>
				<Card className={classes.card}>
					<Box className={classes.cardHeader}>
						<Typography variant='h5' align='center'> <span>{name}:</span> {data[ 0 ].date} - {data[ data.length - 1 ].date} </Typography>
					</Box>
					<CardContent>
						<List>
							<ListItem className={classes.listItem}>
								<ForecastTemp data={main} />
							</ListItem>
							{isFall 
								? <ListItem className={classes.listItem}>
									<ForecastFall data={fall}/>
								</ListItem> 
								: null}
							<ListItem className={classes.listItem}>
								<ForecastHumidity data={humidity} />
							</ListItem>
						</List>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<ForecastBtn
							clicked={handleForecastClose}
							text='Hide Forecast'
						/>
					</CardActions>
				</Card>
			</Grow>
		</Grid>
	);
};

export default ForecastMain;
