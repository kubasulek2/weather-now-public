import axios from 'axios';

export const getGeoLocationPromise = (options = {}) => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};


export const getWeatherDataPromise = (pos, url) => {
	
	const key = '49f3de7ab98b529856d7bd4a842b4338';
	return axios.get(url + pos.latitude + '&lon=' + pos.longitude + '&appid=' + key);

};

export const scrollToTop = (duration = 400, offset = 0, delay = 0) => {
	const scrollHeight = window.scrollY,
		scrollStep = Math.PI / (duration / 15),
		cosParameter = scrollHeight / 2;
	let scrollCount = 0,
		scrollMargin;
	setTimeout(() => {
		const scrollInterval = setInterval(function () {
			if (window.scrollY >= offset) {
				scrollCount = scrollCount + 1;
				scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
				window.scrollTo(0, (scrollHeight - scrollMargin));
			}
			else clearInterval(scrollInterval);
		}, 15);
	}, delay);
};

export const processData = (() => {

	const evaluateTimeString = timeString => {
		const getNumbers = /\d+/g;
		const timeArray = timeString.match(getNumbers);
		const result = Number(timeArray[ 0 ]) * 60 + Number(timeArray[ 1 ]);
		return result;
	};

	return {
		kelvinToCelsius: num => Number((num - 273.15).toFixed(1)),
		calcLocalTime: (dt, offset) => {  // dt given in milliseconds divided by 1000
			const date = new Date(dt + offset * 1000 + new Date().getTimezoneOffset() * 60000);
			const formattedDate = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
			return formattedDate;
		},
		calcLocalDate: (dt, offset) => {
			const date = new Date(dt + offset * 1000 + new Date().getTimezoneOffset() * 60000);
			const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
				'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

			const formattedDate = date.getDate() + ' ' + monthNames[ date.getMonth() ];
			return formattedDate;
		},
		calculateDayOrNight: (timeStr, sunriseStr, sunsetStr) => {

			const time = evaluateTimeString(timeStr),
				sunrise = evaluateTimeString(sunriseStr),
				sunset = evaluateTimeString(sunsetStr);

			return time >= sunrise && time <= sunset ? 'day' : 'night';

		},
		calculateWindDirection: deg => {
			let direction = 'N';

			switch (true) {
				case deg > 337 || deg < 23:
					direction = 'N';
					break;
				case deg > 22 && deg < 68:
					direction = 'NE';
					break;
				case deg > 67 && deg < 113:
					direction = 'E';
					break;
				case deg > 112 && deg < 158:
					direction = 'SE';
					break;
				case deg > 157 && deg < 203:
					direction = 'S';
					break;
				case deg > 202 && deg < 248:
					direction = 'SW';
					break;
				case deg > 247 && deg < 293:
					direction = 'W';
					break;
				case deg > 292 && deg < 338:
					direction = 'NW';
					break;
				default: direction = 'N';	
			}
			return direction;
		}

	};
})();

export const storageManager = (() => {

	let locationArr = [];
	let storage = null;
	let updateTime = null;

	const compareLocation = (location, thisArg) => {
		const compareNames = thisArg.name ? thisArg.name === location.name : true;
		let precision;

		if (compareNames) {
			precision = 0.3; // approximately 30 km
		} else {
			precision = 0.04; // approximately 4 km
		}
		const compareLatitude = thisArg.position.latitude <= location.position.latitude + precision && thisArg.position.latitude >= location.position.latitude - precision;
		const compareLongitude = thisArg.position.longitude <= location.position.longitude + precision && thisArg.position.longitude >= location.position.longitude - precision;

		return compareLatitude && compareLongitude;  // returns true if positions (estimated) correspond
	};

	const addLocation = item => locationArr.unshift(item);

	const removeLocation = (arr, length) => arr.slice(0, length);

	const compareItems = item => {
		return locationArr.filter(function (location) {
			return compareLocation(location, this);
		}, item); //here binding this for callback fn
	};

	const findIndex = item => {
		return locationArr.findIndex(function (location) {
			return compareLocation(location, this);
		}, item); //here binding this for callback fn
	};

	const isItemInStorage = item => compareItems(item).length > 0;

	//const findItem = item => compareItems(item)[ 0 ];

	const isStorageFull = arr => arr.length >= 10;

	const getLocations = storage => JSON.parse(window.localStorage.getItem(storage));

	const retrieveData = (array, updateTime) => {
		return array.map(location => {
			if (location.timeStamp > new Date().getTime() - updateTime) {
				return location;
			} else {
				return {
					position: location.position
				};
			}
		});
	};




	return {
		update: (arr, type) => {

			if (type === 'weather'){
				storage = 'weatherHistory';	
				
				if (isStorageFull(arr)) {
					arr = removeLocation(arr, 10);
				}
			} 
			else if (type === 'forecast') {
				storage = 'forecastHistory';
				if (isStorageFull(arr)) {
					arr = removeLocation(arr, 20);
				}
			}
			else throw new Error('expected parameter: "weather" or "forecast"');

			
			window.localStorage.setItem(storage, JSON.stringify(arr));
			return arr;
		},
		retrieveData: (item, type) => {

			if (type === 'weather') {
				storage = 'weatherHistory';
				updateTime = 1200000;
			}
			else if (type === 'forecast') {
				storage = 'forecastHistory';
				updateTime = 10800000;
			}
			else throw new Error('expected parameter: "weather" or "forecast"');

			locationArr = getLocations(storage) || [];

			if (item === null && locationArr.length) {
				return retrieveData(locationArr, updateTime);

			} else if (item !== null && locationArr.length) {

				if (isItemInStorage(item)) {
					const index = findIndex(item);
					if (index > 0) {
						locationArr.splice(index, 1);
						addLocation(item);
					}
				} else {
					addLocation(item);
				}
				return retrieveData(locationArr, updateTime);
			} else if (item !== null && !locationArr.length) {
				addLocation(item);
				return locationArr;
			} else {
				return locationArr;
			}
		}

	};

})();

