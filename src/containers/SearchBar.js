import React, { Component } from 'react';

import Script from 'react-load-script';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { FnContext } from '../context';

const styles = theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginTop: 8,
		'& input': {
			transition: 'width ease .6s',
		}
	},
	'@global': {
		'.pac-container':{
			width: 190,
			border: '1px solid ' + theme.palette.primary.light,
			borderTop: 'none',
			boxShadow: 'none',
			background: '#fff'

		},
		'.pac-item':{
			fontFamily: 'Open Sans',
			cursor: 'pointer',
			fontSize: 16
		},
		'.pac-item:hover': {
			background: theme.palette.grey[100]
		}
	}
});



class SearchBar extends Component {
	state = {
		inputVal: ''
	}


	searchBarRef = React.createRef();
	
	static contextType = FnContext;

	componentDidUpdate () {
		const { isFocused } = this.props;
		if (isFocused) this.searchBarRef.current.focus();
		else {
			this.searchBarRef.current.blur();
			if(this.state.inputVal.length > 0) this.setState({inputVal: ''});
		}

	}


	handleScriptLoad = () => {
		this.options = { types: [ '(cities)' ] };

		this.google = window.google;
		this.autocomplete = new this.google.maps.places.Autocomplete(document.getElementById('search'), this.options);

		this.autocomplete.setFields([ 'geometry', 'name' ]);
		this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
	};

	handlePlaceSelect = () => {

		let addressObject = this.autocomplete.getPlace();
		if (addressObject.geometry) {
			const place = {
				position: {},
				name: ''
			};
			place.position.latitude = addressObject.geometry.location.lat();
			place.position.longitude = addressObject.geometry.location.lng();
			place.name = addressObject.name;
			this.context.handleWeatherReq(place);
			this.setState({ inputVal: addressObject.name });
			this.context.handleForecastClose();
		} else {
			this.context.handleError('Please Choose Location from the list');
			this.setState({ inputVal: '' });
		} 	
	};

	handleInputChange = (event) => {
		this.setState({ inputVal: event.target.value });
	}

	render () {
		const { classes, isFocused, clicked } = this.props;

		const inputWidth = isFocused ? 192 : 100;

		return (
			<React.Fragment>
				<Script url="https://maps.googleapis.com/maps/api/js?key=APIKEY_GYE&libraries=places&language=en"
					onLoad={this.handleScriptLoad}
				/>
				<TextField
					id="search"
					label="Add Location"
					className={classes.textField}
					type="text"
					margin="normal"
					variant="outlined"
					value={this.state.inputVal}
					onChange={this.handleInputChange}
					inputProps={{
						ref: this.searchBarRef,
						style: {
							width: inputWidth,
						},
						onClick: () => clicked()

					}}

				/>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(SearchBar);
