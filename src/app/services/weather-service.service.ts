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
// API = using this for get and set //
//  `${environment.weatherUrl}${city}${environment.weatherParms}${units}`

  constructor(private _http: HttpClient ) { 
  }

  ////* ERROR: //  Hendler Error //////
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
  
//   Get weather   ///
  getWeatherItems() {
    return this.weather;
   }
/// Save Add weather ////
    addWeatherItem(weatherItem: ICity):void{
  const data = WEATHER_ITEMS.push(weatherItem);
}

// public addCity(weatherData: ICity): void {
//   let savedCities = this.getLocalSavedCities();
//   const cityItem = savedCities.find((city: ICity) => city.id === weatherData.id);

//   if (cityItem) {
//     savedCities = savedCities.map((city: ICity) => {
//       return city.id === weatherData.id ? weatherData : city;
//     });
//   } else {
//     savedCities.push(weatherData);
//   }

//   this.saveToLocal(savedCities);
//   this.savedCities.next(savedCities);
// }




///  **** Fetch api request ***** ///
  
// export const API_Key='0d7303c17ee3d3482cd82a2ad273a90d'; moved to environment///
fetchrApi(city: string, units:any): Observable<City[]> {

  return this._http.get<City[]>
  (`${environment.weatherUrl}${city}${environment.weatherParms}${units}`).pipe(
    retry(1),
    catchError(this.handleError)
    
  );
}


}
// export const find_API = 'https://api.openweathermap.org/data/2.5/find?q=Londo{API_Key}n&units=imperial'; cheking....
// 
