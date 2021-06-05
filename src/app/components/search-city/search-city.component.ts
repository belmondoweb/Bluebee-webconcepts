import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { City } from 'src/app/interface/ICity';

import { ICity } from 'src/app/interface/weather';

import { WEATHER_ITEMS } from 'src/app/interface/weather.data';
import { liveSearch } from 'src/app/services/live-search.operator';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  @Input('weatherData') weatherItem: ICity;
  public cities$: Observable<ICity[]>; 
  public city: City;
  weatherIconURL = 'https://openweathermap.org/img/w/';
  public citiesWeather: City[] = [];
  currentCity: ICity |null = null;
 
private citySub = new Subject<string>();
  form: FormGroup;
  search: FormControl;
  formArray: FormArray
  cityID: number =6;
  searchText: string|null=null;
  private citySub$: Subject<void> = new Subject(); //maybe will use later if ...
  weatherData: any=[];
  submitted = false;

  constructor(private _service: WeatherServiceService, private fb: FormBuilder ) { 
    this.weatherData;
    
  }


  ngOnInit() {
  
    this.getCityList();
    // this.formArray = new FormArray([
    //   new FormGroup({
        
    //     name: new FormControl(''),
    //     temp: new FormControl(''),
    //   })
        
    // ])
    this.form = this.fb.group({
      name:['', Validators.required],
      temp: ['',Validators.required], 
    })
  
  }

// ******** Save to List *********** //
    onSave(form){
    //  this.formArray.push(this.form.value)
      this._service.addWeatherItem(this.form.value) 
      localStorage.setItem('local saved cities', JSON.stringify(form));
        // window.alert('Still WORKING ON IT!! lol ;)\n\n' + JSON.stringify(this.form.value, null, 4));
        console.log('saved?')
       
    }

    // set

    getCityList(){
      this._service.getWeatherItems()
    }

    // ********** Get data from api **********//
   
      sendToAPI(formValues){
      debugger;
      this._service
      .fetchrApi(formValues.name, formValues.temp)
      .subscribe(data => {
        this.weatherData.push(data);
        console.log("Hey are you there? Form value ",formValues?.temp); 
       
      })
    }
    
  
 
}
