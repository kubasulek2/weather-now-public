import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import DirectionIcon from '../UI/DirectionIcon';

import CanvasJSReact from '../../lib/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const useStyles = makeStyles(({ palette }) => ({
	root: {
		width: '100%',
		minWidth: 730,
	},
	windChart: {
		marginTop: '1.4rem',
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap'
	},
	windChartTitle: {
		width: '100%',
		marginBottom: '1.2rem',
		fontSize: '1.4rem',
		fontWeight: 'bold',
		color: palette.grey[ 600 ],
		textAlign: 'center',
	},
	windItem: {
		flex: 1,
		borderRight: '1px solid' + palette.grey[ 400 ],
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'&:last-child': {
			borderRight: 'none'
		}
	},
	icon: {
		display: 'flex',
		justifyContent: 'center',
	},
	labelText: {
		lineHeight: 1.1
	},
	labelPrimary: {
		fontWeight: 'bold',
		padding: '4px'
	},
}));

const ForecastTemp = ({ data }) => {
	const classes = useStyles();
	const theme = useTheme();
	
	const options = {
		animationEnabled: true,
		title: {
			text: 'Temp / Pressure',
			fontSize: 16,
			fontWeight: 'bold',
			fontColor: theme.palette.grey[ 600 ],
			fontFamily: theme.typography.fontFamily
		},
		axisY: {
			includeZero: false,
			suffix: '°C',
			labelFontFamily: theme.typography.fontFamily,
			lineColor: theme.palette.primary.main,
			tickColor: theme.palette.primary.main,
			labelFontColor: theme.palette.primary.main,
			labelFontWeight: 'bold',
			gridThickness: 1,
			gridColor: theme.palette.grey[ 400 ],
		},
		axisY2: {
			suffix: 'hPa',
			includeZero: false,
			labelFontFamily: theme.typography.fontFamily,
			lineColor: theme.palette.error.light,
			tickColor: theme.palette.error.light,
			labelFontColor: theme.palette.error.light,
			labelFontWeight: 'bold',
		},
		axisX: {
			labelMaxWidth: 50,
			interval: 2,
			intervalType: 'hour',
			labelFontSize: 12,
			labelFontColor: theme.palette.grey[ 600 ],
			lineColor: theme.palette.grey[ 500 ],
			labelFontFamily: theme.typography.fontFamily,
		},
		data: [ {
			labelMaxWidth: 60,
			type: 'spline',
			name: 'Temp',
			lineColor: theme.palette.primary.main,
			markerSize: 8,
			yValueFormatString: '##.#°C',
			dataPoints: data.map(el => ({ label: el.date + ' ' + el.time, y: el.temp, color: theme.palette.primary.main }))
		},
		{
			labelMaxWidth: 60,
			type: 'spline',
			yValueFormatString: '#### hPa',
			name: 'Pressure',
			lineColor: theme.palette.error.light,
			markerSize: 8,
			axisYType: 'secondary',
			dataPoints: data.map(el => ({ label: el.date + ' ' + el.time, y: el.pressure, color: theme.palette.error.light }))
		} ],
		toolTip: {
			shared: true,
			fontColor: theme.palette.grey[600],
			fontSize: 12
		}
	};

	return (
		<div className={classes.root}>
			<CanvasJSChart
				options={options}
			/>
			<div className={classes.windChart}>
				<div className={classes.windChartTitle}>Wind</div>
				{data.map(({ wind, date, time, direction }) => (
					<div className={classes.windItem} key={date + time}>
						<div className={classes.icon}>
							<DirectionIcon direction={direction} size='small' />
						</div>
						<div>
							<Typography align='center' className={[ classes.labelText, classes.labelPrimary ].join(' ')} variant='body1'>{wind.toFixed(1)} <br /> m/s</Typography>
							<Typography align='center' display='block' className={classes.labelText} variant='caption'>{date} {time}</Typography>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};


export default ForecastTemp;
