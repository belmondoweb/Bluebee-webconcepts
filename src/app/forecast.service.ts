// import { HttpClient, HttpParams } from '@angular/common/http'
// import { Injectable } from '@angular/core'
// import { Observable } from 'rxjs'
// import { map } from 'rxjs/operators'

// import { environment } from '../environments/environment'
// import { ICity } from './interface/ICity'
// import { ICurrentWeather } from './interface/weather'



// export interface IWeatherService {
//   getCurrentWeather(city: string, units: string): Observable<ICity>
// }

// @Injectable({
//   providedIn: 'root',
// })

// export class WeatherService implements IWeatherService {
//   constructor(private httpClient: HttpClient) {}
//   iWeather: ICity;
//   iCity: ICurrentWeather
//   getCurrentWeather(city: string, units: string): Observable<ICity> {
//     const uriParams = new HttpParams()
//       .set('q', `${city},units&${units}`)
//       .set('appid', environment.API_Key)

//     return this.httpClient
//       .get<ICurrentWeather>(
//         `${environment.weatherUrl}`,
//         { params: uriParams }
//       )
//       .pipe(map((data) => this.iCity[0].temp))
//   }

//   private transformToICurrentWeather(data: ICity): ICurrentWeather {
//     return {
//       city: data.name,
//       units: data.units[0],
//       image: `http://openweathermap.org/img/w/${data[0].icon}.png`,
//       // temperature: this.convertKelvinToFahrenheit(data.main.temp),
//       temperature: data.main.temp,
//       //  description: data.weather[0].description,
//     }
//   }

//   private convertKelvinToFahrenheit(kelvin: number): number {
//     return (kelvin * 9) / 5 - 459.67
//   }
// }