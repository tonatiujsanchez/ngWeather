import { Injectable, isDevMode } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coords } from '../interfaces/coords.interface';
import { Weather } from '../interfaces/weather.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubjet: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  // https://api.openweathermap.org/data/2.5/forecast?lat=17.543341&lon=-98.584579&appid=d083a499dc772d7e56fae69ec1665fea&units=metric
  private endpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';
  private key: string = environment.key;

  constructor(
    private http: HttpClient
  ) {
    this.weather$ = this.weatherSubjet.asObservable()
      .pipe(
        map( this.structureDate )
      );

    this.get({
      lat: 16.853109,
      lon: -99.823654
    });
  }

  structureDate( data: any ){

    let minMaxPerDay: any = {};
    data.list.forEach( (weatherObject: any) => {
      let date  = new Date( weatherObject.dt * 1000 )
      let hours = date.getHours();
      let month = date.getMonth();
      let day   = date.getDate();
      let key = `${month}-${day}`;
      
      let tempPerDay: Weather = minMaxPerDay[key] || {
        minMaxTemp: { }  
      };

      if( !tempPerDay.id || hours == 16){
        let source = weatherObject.weather[0];
        tempPerDay = {...tempPerDay, ...source, temp: weatherObject.main.temp, name: data.city.name, date: weatherObject.dt};
      }

      if( !tempPerDay.minMaxTemp.min || ( weatherObject.main.temp_min <= tempPerDay.minMaxTemp?.min ) ){
        
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      };
      if( !tempPerDay.minMaxTemp.max || (weatherObject.main.temp_max >= tempPerDay.minMaxTemp?.max) ){
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      };

      minMaxPerDay[key] = tempPerDay;
    });

    return Object.values(minMaxPerDay);
  }

  get( coords: Coords ){

    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&appid=${this.key}&units=metric`;

    if(isDevMode()){      
      this.http.get('assets/forecast.json').subscribe(this.weatherSubjet);
    }else{
      this.http.get(this.endpoint + args).subscribe(this.weatherSubjet);
    }

  }
}


