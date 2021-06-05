import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { ForecastResultComponent } from './components/forecast-result/forecast-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarMenuComponent } from './components/nav-bar-menu/nav-bar-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    ForecastResultComponent,
    NavBarMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
