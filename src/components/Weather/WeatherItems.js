import React, { useContext, useEffect } from 'react';

import WeatherItem from './WeatherItem';
import { AppContext, FnContext } from '../../context';

const WeatherItems = () => {
	const { weatherData} = useContext(AppContext);
	const { handleWeatherReq } = useContext(FnContext);
	
	const handleClick = place => {
		handleWeatherReq(place);
	};
	
	let time = new Date().getTime();
	useEffect(() => {
		const timer = setInterval(() => {time = new Date().getTime();}, 20000);
		return () => clearInterval(timer);
	}, []);
	let items = null;
	if (weatherData) {
		items = weatherData.map((item, index) => (index > 0
			? <WeatherItem
				data={item}
				key={item.name}
				time={time}
				clicked={() => handleClick(item)}
			/>
			: null
		));
	}


	return items;
};

export default WeatherItems;
