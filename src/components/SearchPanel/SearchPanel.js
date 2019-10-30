import React from 'react';
import { useState, useEffect, useContext, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CityIcon from '@material-ui/icons/Apartment';
import AddIcon from '@material-ui/icons/AddCircle';
import LocationIcon from '@material-ui/icons/MyLocation';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


import SearchBar from '../../containers/SearchBar';
import { FnContext } from '../../context';

const useStyles = makeStyles(theme => ({
	card: {
		width: 300,
		padding: '.5rem',
		transition: 'all ease .6s',
		boxShadow: theme.shadows[ 2 ],
		'&:hover': {
			boxShadow: theme.shadows[ 5 ]
		},
		[ theme.breakpoints.down('sm') ]: {
			width: 250,

		}
	},
	cover: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		cursor: 'pointer',
		alignItems: 'center',
	},
	iconWrapper: {
		width: 120,
		height: 120,
		position: 'relative',
		[ theme.breakpoints.down('sm') ]: {
			width: 100,
			height: 100,
		}
	},
	cityIcon: {
		width: '75%',
		height: '75%',
		color: theme.palette.secondary.dark,
		position: 'absolute',
		zIndex: 0,
		top: '12%',
		left: '20%',
	},
	addIcon: {
		width: '37.5%',
		height: '37.5%',
		color: theme.palette.primary.main,
		position: 'absolute',
		top: '60%',
		left: '9%',
		zIndex: 1,
	},
	content: {
		display: 'flex',
		justifyContent: 'center',
		padding: 8
	},
	action: {
		display: 'flex',
		justifyContent: 'center',
		padding: 0,
		paddingTop: 8
	},
	localizeIcon: {
		color: theme.palette.primary.main
	},
	localizeButton: {
		color: theme.palette.primary.main
	}

}));

const SearchPanel = () => {
	const classes = useStyles();
	const [ focus, setFocus ] = useState(false);
	const panelRef = React.createRef(null);
	const { handleGeolocation } = useContext(FnContext);

	const handleClickOutside = useCallback(event => {
		if (panelRef.current && !panelRef.current.contains(event.target)) {
			setFocus(false);
		}
	}, [ panelRef ]);


	useEffect(() => {

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ handleClickOutside ]);
	const handleClick = () => setFocus(!focus);

	return (
		<Card
			ref={panelRef}
			className={classes.card}
		>
			<CardMedia
				className={classes.cover}
				onClick={handleClick}
			>
				<div className={classes.iconWrapper}>
					<CityIcon className={classes.cityIcon} />
					<AddIcon className={classes.addIcon} />
				</div>
			</CardMedia>
			<CardContent className={classes.content}>
				<SearchBar
					isFocused={focus}
					clicked={() => setFocus(true)}
				/>
			</CardContent>
			<Divider />
			<CardActions className={classes.action}>
				<Button
					startIcon={<LocationIcon className={classes.localizeIcon} />}
					className={classes.localizeButton}
					size='small'
					onClick={event => handleGeolocation(event)}

				>
					Find me
				</Button>
			</CardActions>
		</Card>
	);
};
export default SearchPanel;