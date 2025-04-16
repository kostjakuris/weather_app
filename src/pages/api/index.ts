import axios from 'axios';
import { mobxStore } from '../../store/mobx';
import { toJS } from 'mobx';

const apiUrl = process.env.REACT_APP_API_URL;
const geocodingApiUrl = process.env.REACT_APP_GEOCODING_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getCoordinates = async(cityName: string) => {
  try {
    axios.get(`${geocodingApiUrl}/direct?q=${cityName}&limit=1&appid=${apiKey}`, {}).then(
      (response) => {
        if (response.data.length !== 0 && response.data[0].lat && response.data[0].lon) {
          getWeather(response.data[0].lat, response.data[0].lon);
        }
      });
  } catch (error: any) {
    throw Error(error.data);
  }
};

export const getWeather = async(lat: number, lon: number) => {
  try {
    const response = await axios.get(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`, {});
    mobxStore.setWeatherData(response.data);
    console.log(toJS(mobxStore.weatherData));
  } catch (error: any) {
    console.error(error);
  }
};