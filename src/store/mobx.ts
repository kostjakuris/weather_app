import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class MobxStore {
  
  weatherData = {};
  
  setWeatherData = (weatherData: any) => {
    this.weatherData = weatherData;
  };
  
  constructor() {
    makeAutoObservable(this);
    
    makePersistable(this, {
      name: 'MobxStore',
      properties: ['weatherData'],
      storage: window.localStorage
    });
  }
}

export const mobxStore = new MobxStore();