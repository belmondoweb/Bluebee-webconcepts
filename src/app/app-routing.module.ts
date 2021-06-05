import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastResultComponent } from './components/forecast-result/forecast-result.component';
import { SearchCityComponent } from './components/search-city/search-city.component';

const routes: Routes = [
  {path:'',  pathMatch: "full", redirectTo: "search"},
  {path:'search', component: SearchCityComponent},
  {path:'curent-weather', component: ForecastResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
