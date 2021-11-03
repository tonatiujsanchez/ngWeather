import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from '../../environments/environment';

import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Coords } from '../interfaces/coords.interface';
import { Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubjet: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  // https://api.openweathermap.org/data/2.5/weather?lat=17.543341&lon=-98.584579&appid=d083a499dc772d7e56fae69ec1665fea&units=metric
  private endpoint: string = 'https://api.openweathermap.org/data/2.5/weather';
  private key: string = environment.key;

  constructor(
    private http: HttpClient
  ) { 
    this.weather$ = this.weatherSubjet.asObservable()
      .pipe(
        map( (data:any)=>{ 
          let mainWeather = data.weather[0];
                   
          let weather: Weather = {
            name: data.name,
            cod: data.cod,
            temp: data.main.temp,
            ...mainWeather
          }
          return weather;
         })
      )

    
    this.get({
      lat: 16.853109,
      lon: -99.823654
    });
  }

  get( coords: Coords ){

    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&appid=${this.key}&units=metric`;

    if(isDevMode()){      
      this.http.get('assets/weather.json').subscribe(this.weatherSubjet);
    }else{
      this.http.get(this.endpoint + args).subscribe(this.weatherSubjet);
    }

  }


}
