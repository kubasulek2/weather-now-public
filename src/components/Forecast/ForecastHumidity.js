import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CanvasJSReact from '../../lib/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const useStyles = makeStyles({
	root: {
		width: '100%',
		minWidth: 730,
	},
});

const ForecastTemp = ({ data }) => {
	const classes = useStyles();
	const theme = useTheme();

	const options = {
		animationEnabled: true,
		title: {
			text: 'Humidity / Clouds',
			fontSize: 16,
			fontWeight: 'bold',
			fontColor: theme.palette.grey[ 600 ],
			fontFamily: theme.typography.fontFamily
		},
		axisY: {
			maximum: 100,
			suffix: '%',
			labelFontFamily: theme.typography.fontFamily,
			lineColor: theme.palette.primary.main,
			tickColor: theme.palette.primary.main,
			labelFontColor: theme.palette.primary.main,
			labelFontWeight: 'bold',
			gridThickness: 1,
			gridColor: theme.palette.grey[ 400 ],
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
			type: 'column',
			name: 'Humidity',
			showInLegend: true,
			legendMarkerColor: theme.palette.primary.main,
			legendText: 'Humidity',
			percentFormatString: '00',
			// toolTipContent: '{y}%',
			dataPoints: data.map(el => ({
				label: el.date + ' ' + el.time, y: el.humidity, color: 'rgba(129, 212, 250, .8)'
			}))
		},
		{
			type: 'column',
			percentFormatString: '00',
			// toolTipContent: '{y}%',
			name: 'Clouds',
			showInLegend: true,
			legendMarkerColor: theme.palette.secondary.dark,
			legendText: 'Clouds',
			dataPoints: data.map(el => ({ label: el.date + ' ' + el.time, y: el.clouds, color: 'rgba(251, 192, 45, .8)' }))
		} ],
		toolTip: {
			shared: true,
			fontColor: theme.palette.grey[ 600 ],
			fontSize: 12
		},
		legend: {
			fontColor: theme.palette.grey[ 600 ],
			fontFamily: theme.typography.fontFamily,
		},
	};

	return (
		<div className={classes.root}>
			<CanvasJSChart
				options={options}
			/>
		</div>
	);
};


export default ForecastTemp;