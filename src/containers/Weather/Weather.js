import React, { Component } from 'react';

import { SiteGrid } from '../../components/Layout';
import ErrorModal from '../../components/UI/ErrorModal';


/* IMPORT GLOBAL UTILITY FUNCTIONS */
import { getGeoLocationPromise, getWeatherDataPromise, processData, storageManager } from '../../utility/utils';
import { AppContext, FnContext } from '../../context';

export class Weather extends Component {

	/* STATE */

	state = {
		appDefaultLocation: {
			latitude: '52.229771',
			longitude: '21.01178'
		},
		weatherUrl: 'https://api.openweathermap.org/data/2.5/weather?lang=en&lat=',
		forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast?lang=en&lat=',
		inputVal: '',
		weatherData: null,
		forecastData: null,
		reqError: false,
		loading: false,
		mainTransition: true,

	}
	timer = null
	/* lIFECYCLE */

	componentDidMount () {
		this.getInitialWeatherData();
	}

	componentWillUnmount () {
		this.timer = null;
	}


	/* UTILITY METHODS */

	// Weather

	processWeatherData = (respArr) => respArr.map(resp => {
		const data = resp.data;
		const { main, wind, name, clouds, weather, timezone, rain, snow } = data;
		let weatherData = { name, ...main, timezone, wind, weather, clouds, sunrise: data.sys.sunrise, sunset: data.sys.sunset, country: data.sys.country };
		const { pressure } = weatherData;
		const weatherDataParsed = {
			date: processData.calcLocalDate(data.dt * 1000, timezone),
			...weatherData,
			pressure: pressure.toFixed(),
			position: {
				latitude: resp.data.coord.lat,
				longitude: resp.data.coord.lon
			},
			timeStamp: new Date().getTime(),
			time: processData.calcLocalTime(new Date().getTime(), timezone),
			snow: (
				snow
					? snow[ '3h' ] ? (snow[ '3h' ] / 3).toFixed() : snow[ '1h' ]
					: null
			),
			rain: (
				rain
					? rain[ '3h' ] ? (rain[ '3h' ] / 3).toFixed() : rain[ '1h' ]
					: null
			),
			weather: {
				main: weatherData.weather[ 0 ].main,
				description: weatherData.weather[ 0 ].description
			},
			temp: processData.kelvinToCelsius(Number(weatherData.temp)),
			temp_max: processData.kelvinToCelsius(Number(weatherData.temp_max)),
			temp_min: processData.kelvinToCelsius(Number(weatherData.temp_min)),
			sunrise: processData.calcLocalTime(weatherData.sunrise * 1000, timezone),
			sunset: processData.calcLocalTime(weatherData.sunset * 1000, timezone)
		};
		return weatherDataParsed;
	});




	// Forecast

	processForecastData = resp => {
		const data = resp.data;
		console.log(resp.data);
		const list = data.list.map(item => ({
			date: processData.calcLocalDate(item.dt * 1000, data.city.timezone),
			time: processData.calcLocalTime(item.dt * 1000, data.city.timezone),
			pressure: item.main.pressure,
			humidity: item.main.humidity,
			clouds: item.clouds.all,
			snow: (
				item.snow
					? item.snow[ '3h' ] ? (Number(item.snow[ '3h' ] / 3).toFixed()) : Number(item.snow[ '1h' ])
					: null),
			rain: (
				item.rain
					? item.rain[ '3h' ] ? (Number(item.rain[ '3h' ] / 3).toFixed()) : Number(item.rain[ '1h' ])
					: null),
			weather: {
				main: item.weather[ 0 ].main,
				description: item.weather[ 0 ].description,
			},
			wind: item.wind,
			temp: processData.kelvinToCelsius(Number(item.main.temp)),
		}));
		const forecastData = {
			name: data.city.name,
			position: {
				latitude: data.city.coord.lat,
				longitude: data.city.coord.lon,
			},
			timeStamp: new Date().getTime(),
			list: list
		};
		return forecastData;

	}

	// General

	pushDataToLocalStorage = (resp, type) => {
		resp = storageManager.update(resp, type);
		return resp;
	}

	mergeWeatherData = (respArr, dataArr) => {
		if (!dataArr.length) return respArr;
		let index = 0;
		return dataArr.map(el => {
			if (el.temp === undefined) {
				let arrItem = respArr[ index ];
				index++;
				return arrItem;
			}
			return el;
		});
	};
	mergeForecastData = (respArr, dataArr) => {
		if (!dataArr.length) return respArr;
		else return [ ...respArr, ...dataArr ];
	}

	handleTransition = bool => this.setState({ mainTransition: bool });

	closeErrorModal = () => this.setState({ reqError: false });

	handleError = error => this.setState({ reqError: error })

	handleForecastClose = () => this.setState({ forecastData: null });

	/* MAIN METHODS */

	getInitialWeatherData = async () => {
		this.timer = setTimeout(() => this.getInitialWeatherData(), 1200000);
		let weatherData = null;
		const retrievedData = storageManager.retrieveData(null, 'weather');

		if (retrievedData.length) {

			if (!retrievedData.filter(el => el.temp === undefined).length) {
				this.setState({ weatherData: retrievedData });
				return;

			} else {
				weatherData = Promise.all(retrievedData.filter(el => el.temp === undefined).map(item => getWeatherDataPromise(item.position, this.state.weatherUrl)));
			}

		} else {

			try {
				const { coords } = await getGeoLocationPromise();
				weatherData = Promise.all([ getWeatherDataPromise(coords, this.state.weatherUrl) ]);
			} catch (_) {
				weatherData = Promise.all([ getWeatherDataPromise({ ...this.state.appDefaultLocation }, this.state.weatherUrl) ]);

			}

		}
		this.setState({ loading: true });
		weatherData
			.then(respArr => this.processWeatherData(respArr))
			.then(respArr => this.mergeWeatherData(respArr, retrievedData))
			.then(respArr => this.pushDataToLocalStorage(respArr, 'weather'))
			.then(respArr => this.setState({ weatherData: respArr, loading: false }))
			.catch((err) => this.setState({ reqError: err.message, loading: false }));

	}

	weatherRequestHandler = (place) => {
		this.handleTransition(true);
		const retrievedData = storageManager.retrieveData(place, 'weather');

		if (!retrievedData.filter(el => el.temp === undefined).length) {
			this.pushDataToLocalStorage(retrievedData, 'weather');
			this.setState({ weatherData: retrievedData });
			return;
		} else {
			this.setState({ loading: true });
			Promise.all(retrievedData.filter(el => el.temp === undefined).map(item => getWeatherDataPromise(item.position, this.state.weatherUrl)))
				.then(respArr => this.processWeatherData(respArr))
				.then(respArr => this.mergeWeatherData(respArr, retrievedData))
				.then(respArr => this.pushDataToLocalStorage(respArr, 'weather'))
				.then(respArr => this.setState({ weatherData: respArr, loading: false }))
				.catch((err) => this.setState({ reqError: err.message, loading: false }));


		}
	};

	getWeatherFromGeoLocationHandler = async event => {
		event.stopPropagation();
		this.handleTransition(true);
		try {
			const { coords } = await getGeoLocationPromise();
			const dataObj = { position: { latitude: coords.latitude, longitude: coords.longitude } };
			const retrievedData = storageManager.retrieveData(dataObj, 'weather');

			if (!retrievedData.filter(el => el.temp === undefined).length) {
				this.pushDataToLocalStorage(retrievedData, 'weather');
				this.setState({ weatherData: retrievedData });
				return;
			} else {
				this.setState({ loading: true });
				Promise.all(retrievedData.filter(el => el.temp === undefined).map(item => getWeatherDataPromise(item.position, this.state.weatherUrl)))
					.then(respArr => this.processWeatherData(respArr))
					.then(respArr => this.mergeWeatherData(respArr, retrievedData))
					.then(respArr => this.pushDataToLocalStorage(respArr, 'weather'))
					.then(respArr => this.setState({ weatherData: respArr, loading: false }))
					.catch((err) => this.setState({ reqError: err.message, loading: false }));
			}

		} catch (err) {
			this.setState({ reqError: err.message, loading: false });
		}
	}

	getForecastHandler = () => {
		this.handleTransition(true);
		const place = {
			name: this.state.weatherData[ 0 ].name,
			position: { ...this.state.weatherData[ 0 ].position }
		};
		const retrievedData = storageManager.retrieveData(place, 'forecast');


		if (retrievedData[ 0 ].list !== undefined) {
			this.setState({ forecastData: retrievedData[0] });
			return;
		}

		this.setState({ loading: true });
		getWeatherDataPromise(place.position, this.state.forecastUrl)
			.then(resp => this.processForecastData(resp))
			.then(resp => this.mergeForecastData([ resp ], retrievedData.slice(1)))
			.then(resp => this.pushDataToLocalStorage(resp, 'forecast'))
			.then(resp => this.setState({ forecastData: resp[ 0 ], loading: false }))
			.catch((err) => this.setState({ reqError: err.message, loading: false }));

	}


	render () {

		return (
			<AppContext.Provider
				value={{
					weatherData: this.state.weatherData,
					forecastData: this.state.forecastData,
					transition: this.state.mainTransition
				}}
			>
				<FnContext.Provider
					value={{
						setTransition: this.handleTransition,
						handleWeatherReq: this.weatherRequestHandler,
						handleGeolocation: this.getWeatherFromGeoLocationHandler,
						handleForecastClose: this.handleForecastClose,
						handleError: this.handleError,
						handleForecastReq: this.getForecastHandler

					}}
				>
					<SiteGrid loading={this.state.loading} forecast={this.state.forecastData} />
					<ErrorModal
						open={!!this.state.reqError}
						errMessage={this.state.reqError ? this.state.reqError : ''}
						handleClose={this.closeErrorModal}
					/>
				</FnContext.Provider>
			</AppContext.Provider>
		);
	}
}

export default Weather;
