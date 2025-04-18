export interface WeatherData {
  current: any;
  daily: Array<object>;
  hourly: Array<object>;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: string;
  minutely: Array<object>;
}