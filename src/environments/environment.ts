// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_Key:'0d7303c17ee3d3482cd82a2ad273a90d', using in weatherParams
  // FullAPI:'api.openweathermap.org/data/2.5/weather?q={city}&appid={API_Key}&units={units}',
  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather?=',
  weatherParms: '&appid=0d7303c17ee3d3482cd82a2ad273a90d&units=',
  weatherIconURL: 'https://openweathermap.org/img/w/'
};


