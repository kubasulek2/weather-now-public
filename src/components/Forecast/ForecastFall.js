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

const ForecastFall = ({ data }) => {
	const classes = useStyles();
	const theme = useTheme();
	const isRain = !!data.reduce((result, { rain }) => result + rain, 0);
	const isSnow = !!data.reduce((result, { snow }) => result + snow, 0);

	let title,
		primaryData = data.map(el => ({ label: el.date + ' ' + el.time, y: el.rain, color: theme.palette.primary.dark })),
		secondaryData = {},
		dataName = 'Rain';


	if (isRain && isSnow) {
		title = 'Rain / Snow';
		secondaryData = {
			type: 'splineArea',
			showInLegend: true,
			yValueFormatString: '0 mm',
			color: 'rgba(154, 220, 251,.7)',
			legendText: 'Snow',
			name: 'Snow',
			lineColor: theme.palette.primary.light,
			dataPoints: data.map(el => ({ label: el.date + ' ' + el.time, y: 3, color: theme.palette.primary.light }))
		};
	} else if (isRain) {
		title = 'Rain';

	} else {
		title = 'Snow';
		dataName = 'Snow';
		primaryData = data.map(el => ({ label: el.date + ' ' + el.time, y: el.snow, color: theme.palette.primary.light }));
	}

	const options = {
		animationEnabled: true,
		title: {
			text: title,
			fontSize: 16,
			fontWeight: 'bold',
			fontColor: theme.palette.grey[ 600 ],
			fontFamily: theme.typography.fontFamily
		},
		axisY: {
			includeZero: true,
			suffix: 'mm',
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
			showInLegend: true,
			type: 'splineArea',
			name: dataName,
			legendText: dataName,
			lineColor: theme.palette.primary.dark,
			color: 'rgba(3, 169, 244,.7)',
			yValueFormatString: '0 mm',
			dataPoints: primaryData
		},
		secondaryData
		],
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


export default ForecastFall;
