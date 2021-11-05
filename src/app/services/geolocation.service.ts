import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Coords } from '../interfaces/coords.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public coordsSubject: Subject<Coords> = new Subject<Coords>();
  public coords$: Observable<Coords> = this.coordsSubject.asObservable();

  public coordsPromise!: Promise<Coords>;

  public permission$!: Promise<string>;

  constructor() {
    this.permission$ = (navigator as any).permissions.query({name:'geolocation'})
      .then( (permission: any) => permission.state )
   }

  requestGeolocation(){

    if( !this.coordsPromise ){
      this.coordsPromise = this.getGeolocation();
    }

    this.coordsPromise.then(
      ( coords ) => this.coordsSubject.next( coords ) 
    );
  }

  getGeolocation(): Promise<Coords>{
    return new Promise( ( resolve, reject )=>{

      if( !navigator || !('geolocation' in navigator) ){
        return reject('Geolocation is not available');
      }

      (navigator as any).geolocation.getCurrentPosition(
        (position: any)=>{
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        });
    });
  }
}
