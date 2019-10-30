import { createContext } from 'react';

export const AppContext = createContext({
	weatherData: '',
	transition: ''
	
});

export const FnContext = createContext({
	setTransition: () => { },
	handleWeatherReq: () => { },
	handleGeolocation: () => { },
	handleError: () => { },
	handleForecastReq: () => { }
});
