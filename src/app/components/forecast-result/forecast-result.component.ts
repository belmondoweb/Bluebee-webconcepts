import { Component, Input, OnInit, Output } from '@angular/core';
// import { WeatherService } from 'src/app/forecast.service';
import { City } from 'src/app/interface/ICity';
import { WeatherServiceService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-forecast-result',
  templateUrl: './forecast-result.component.html',
  styleUrls: ['./forecast-result.component.scss']
})
export class ForecastResultComponent implements OnInit {
  @Input('item') weatherItem: City;
  @Output() weatherData;
  constructor( private weatherService: WeatherServiceService) { }

  public current: City;
  
  ngOnInit(): void {

  }



}
