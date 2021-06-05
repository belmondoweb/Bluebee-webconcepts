import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { City } from '../interface/ICity';

import { ICity } from '../interface/weather';
import { WEATHER_ITEMS } from '../interface/weather.data';

@Injectable({
  providedIn: 'root'
})

export class WeatherServiceService {
weather: City[]=[];
private savedCities: BehaviorSubject<ICity[]>;
//  image API
weatherIconURL = 'https://openweathermap.org/img/w/';
// API = using for get and set //
//  `${environment.weatherUrl}${city}${environment.weatherParms}${units}`

  constructor(private _http: HttpClient ) { 
   
  }
////* ERROR: //  Hendler Error
_errorHandler(error: Response) {debugger;
  console.log(error);
  return Observable.throw(error || 'Internal server error');
}
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('Client Side Error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    `
  There is a problem with the service. 
  We are notified & working on it. Please try again later.
  NPeretz team`);
};
  getWeatherItems() {
    return this.weather;
   }

    addWeatherItem(weatherItem: ICity):void{
  const data = WEATHER_ITEMS.push(weatherItem);
}
public getLocalSavedCities(): ICity[] {
  const data = localStorage.getItem('local saved cities');
  return data ? <ICity[]> JSON.parse(data) : [];
}
public addCity(weatherData: ICity): void {
  let savedCities = this.getLocalSavedCities();
  const cityItem = savedCities.find((city: ICity) => city.id === weatherData.id);

  if (cityItem) {
    savedCities = savedCities.map((city: ICity) => {
      return city.id === weatherData.id ? weatherData : city;
    });
  } else {
    savedCities.push(weatherData);
  }

  this.saveToLocal(savedCities);
  this.savedCities.next(savedCities);
}



public getSavedCities(): Observable<ICity[]> {
  return this.savedCities.pipe(
    map((data: ICity[]) => data.filter((item: ICity) => 
    item.name && item.weather[0].iconUrl && item.units))
  );
}


private saveWeatherToLocalStorage(weatherDataArray: ICity[]): void {
  const data = JSON.stringify(weatherDataArray);
  localStorage.setItem('local saved weather data', data);
}
 saveToLocal(cities: ICity[]): void {
  localStorage.setItem('local saved cities', JSON.stringify(cities));
}
private getWeatherLocalStorage(): ICity[] {
  const data = localStorage.getItem('local saved weather data');
  return data ? <ICity[]> JSON.parse(data) : [];
}
//  sent to api
fetchrApi(city: string, units:any): Observable<City[]> {

  return this._http.get<City[]>
  (`${environment.weatherUrl}${city}${environment.weatherParms}${units}`).pipe(
    retry(1),
    catchError(this.handleError)
    
  );
}


}
// export const find_API = 'https://api.openweathermap.org/data/2.5/find?q=London&units=imperial'; cheking....
// 
// Use API https://openweathermap.org/ with apiKey: 0d7303c17ee3d3482cd82a2ad273a90d

// export const API_Key='0d7303c17ee3d3482cd82a2ad273a90d'; moved to environment///