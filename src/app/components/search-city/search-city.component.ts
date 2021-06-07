import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';   
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public cities$: Observable<ICity[]>; 
  weatherIconURL = 'https://openweathermap.org/img/w/';

  form: FormGroup;
  search: FormControl;
  formArray: FormArray;
  private citySub$: Subject<void> = new Subject(); //maybe will use later if ...
  weatherData: any=[];
  weatherIndex: any;

  constructor(private _service: WeatherServiceService, private fb: FormBuilder ) { 
    this.weatherData; 
  }


  ngOnInit() {
    this.form = this.fb.group({   
      weather : this.fb.array([this.addWeatherGroup()])
    });
    this.getCityList();
    
  }

  addWeatherGroup(){
    return  this.fb.group({   
      name:['',Validators.required],
      temp: ['',Validators.required],
    });
  }

  get weatherArray(){
  return this.form.get('weather') as FormArray;
  }

// ******** Save to List *********** //
    onSave(form,i){
      this.weatherIndex = i;
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
      this._service
      .fetchrApi( formValues.weather[this.weatherIndex].name, formValues.weather[this.weatherIndex].temp)
      .subscribe(data => {
        this.weatherData.push(data); 
        this.weatherArray.push(this.addWeatherGroup());
        console.log("Hey are you there? Form value ",formValues?.temp); 
      })
      }
    
}
