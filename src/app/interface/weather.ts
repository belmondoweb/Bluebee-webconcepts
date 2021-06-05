import { City } from "./ICity";


 export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
  iconUrl?: string;
}
export interface IMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}
interface ISys {
  type: number;
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  message: number;
}

export interface ICity {
  base?: string;
  id?: number;
  name?: string;
  weather: IWeather[];
  main: IMain;
  sys: ISys;
  rain?: any;
  units:any;
  snow?: any;
  City:[]
}
