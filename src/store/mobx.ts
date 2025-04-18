import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { WeatherData } from '../interface/app.interface';


class MobxStore {
  currentCity = '';
  weatherData: WeatherData | null = null;
  isLoading: boolean = false;
  wrongCity: boolean = false;
  updateTime = '';
  
  setCurrentCity = (currentCity: string) => {
    this.currentCity = currentCity;
  };
  
  setUpdateTime = (updateTime: string) => {
    this.updateTime = updateTime;
  };
  
  setIsLoading = (loading: boolean) => {
    this.isLoading = loading;
  };
  
  setWrongCity = (wrongCity: boolean) => {
    this.wrongCity = wrongCity;
  };
  
  setWeatherData = (weatherData: any) => {
    this.weatherData = weatherData;
  };
  
  constructor() {
    makeAutoObservable(this);
    
    makePersistable(this, {
      name: 'MobxStore',
      properties: ['weatherData', 'currentCity', 'updateTime'],
      storage: window.localStorage,
    });
  }
}

export const mobxStore = new MobxStore();