import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// import { WeatherService } from 'src/app/forecast.service';
import { City } from 'src/app/interface/ICity';
import { WeatherServiceService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-forecast-result',
  templateUrl: './forecast-result.component.html',
  styleUrls: ['./forecast-result.component.scss']
})
export class ForecastResultComponent implements OnInit {

  weatherIconURL = 'https://openweathermap.org/img/w/';
  public citiesWeather: City[] = [];
  form: FormGroup;
  search: FormControl;
  formArray: FormArray;
  weatherData: any=[];
  submitted = false;  
  weatherIndex: any;

  constructor( private _service: WeatherServiceService, private fb: FormBuilder) { }
public current: City;
  
  ngOnInit(): void {
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
