import axios from 'axios';
import { mobxStore } from '../../store/mobx';

const apiUrl = process.env.REACT_APP_API_URL;
const geocodingApiUrl = process.env.REACT_APP_GEOCODING_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getCoordinates = async(cityName: string) => {
  try {
    mobxStore.setIsLoading(true);
    axios.get(`${geocodingApiUrl}/direct?q=${cityName}&limit=1&appid=${apiKey}`, {}).then(
      (response) => {
        if (response.data.length === 0) {
          mobxStore.setWrongCity(true);
        } else {
          mobxStore.setWrongCity(false);
          mobxStore.setCurrentCity(cityName);
          getWeather(response.data[0].lat, response.data[0].lon);
        }
      });
  } catch (error: any) {
    mobxStore.setIsLoading(false);
    throw Error(error.data);
  } finally {
    mobxStore.setIsLoading(false);
  }
};

export const getWeather = async(lat: number, lon: number) => {
  try {
    mobxStore.setIsLoading(true);
    const response = await axios.get(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`, {});
    mobxStore.setWeatherData(response.data);
    mobxStore.setUpdateTime(new Date().toLocaleTimeString([], {timeStyle: 'short'}));
  } catch (error: any) {
    console.error(error);
    mobxStore.setIsLoading(false);
  } finally {
    mobxStore.setIsLoading(false);
  }
};