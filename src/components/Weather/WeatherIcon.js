import React from 'react';

import { ReactComponent as CloudIcon } from '../../assets/icons/cloud.svg';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as RainIcon } from '../../assets/icons/rain.svg';
import { ReactComponent as SnowIcon } from '../../assets/icons/snow.svg';
import { ReactComponent as SunCloudIcon } from '../../assets/icons/sun_cloud.svg';
import { ReactComponent as SunRainIcon } from '../../assets/icons/sun_rain.svg';
import { ReactComponent as SunSnowIcon } from '../../assets/icons/sun_snow.svg';
import { ReactComponent as MoonCloudIcon } from '../../assets/icons/moon_cloud.svg';
import { ReactComponent as MoonRainIcon } from '../../assets/icons/moon_rain.svg';
import { ReactComponent as MoonSnowIcon } from '../../assets/icons/moon_snow.svg';

import { processData } from '../../utility/utils';

const styles = {
	width: '100%',
	height: '100%',
};

const WeatherIcon = ({ clouds, weather, time, sunset, sunrise }) => {
	const { calculateDayOrNight } = processData;
	
	const calculateIcon = () => {
		const dayTime = calculateDayOrNight(time, sunrise, sunset);

		if (clouds > 80) {
			if (weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm') return <RainIcon style={styles} />;
			else if (weather === 'Snow') return <SnowIcon style={styles} />;
			else return <CloudIcon style={styles} />;
		}

		if (dayTime === 'day') {
			if (clouds > 35) {
				if (weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm') return <SunRainIcon style={styles} />;
				else if (weather === 'Snow') return <SunSnowIcon style={styles} />;
				else return <SunCloudIcon style={styles} />;
			} else {
				if (weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm') return <SunRainIcon style={styles} />;
				else if (weather === 'Snow') return <SunSnowIcon style={styles} />;
				else return <SunIcon style={styles} />;
			}

		} else {
			if (clouds > 35) {
				if (weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm') return <MoonRainIcon style={styles} />;
				else if (weather === 'Snow') return <MoonSnowIcon style={styles} />;
				else return <MoonCloudIcon style={styles} />;
			} else {
				if (weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm') return <MoonRainIcon style={styles} />;
				else if (weather === 'Snow') return <MoonSnowIcon style={styles} />;
				else return <MoonIcon style={styles} />;
			}
		}
	};

	return calculateIcon();
};

export default React.memo(WeatherIcon);
