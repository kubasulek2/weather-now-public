import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

//import SearchBar from '../../containers/SearchBar';
import Spinner from '../UI/Spinner';
import SearchPanel from '../SearchPanel/SearchPanel';
import WeatherItems from '../Weather/WeatherItems';
import WeatherMain from '../Weather/WeatherMain';
import ForecastMain from '../Forecast/ForecastMain';

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		minHeight: 'calc(100vh - 128px)',  //page height, subtract negative margin (spacing property), subtract header and footer height
		height: '100%',

		'@media (max-width:599px)': {
			minHeight: 'calc(100vh - 112px)',
			paddingLeft: 6,
			paddingRight: 6,
		},
		'@media (max-width:599px) and (orientation: landscape)': {
			minHeight: `calc(100vh + 10px - 96px - ${ theme.spacing(8) }px)`,
		},
	},
	searchPanelContainer: {
		'@media (max-width:599px)': {
			margin: -10,  // don't know why, but without it, scrollbars appear on page
		},
	}
}));

const SiteGrid = ({ loading, forecast }) => {
	const classes = useStyles();
	const displayData = forecast ? <ForecastMain /> : <WeatherItems />;
	
	return (
		<Container className={classes.root} maxWidth='md'>
			<Grid container spacing={2} justify='center' className={classes.searchPanelContainer}>
				<Grid item>
					<SearchPanel />
				</Grid>
			</Grid>
			<Grid container spacing={1}>
				{loading
					? <Spinner />
					: <Fragment>
						<WeatherMain />
						{displayData}
					</Fragment>
				}

			</Grid>
		</Container>
	);
};

export default React.memo(SiteGrid);
