import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-geolocation-btn',
  templateUrl: './geolocation-btn.component.html',
  styleUrls: ['./geolocation-btn.component.sass']
})
export class GeolocationBtnComponent implements OnInit {

  permissionActive: boolean = false;

  constructor(
    public geolocationSvc: GeolocationService
  ) { }

  ngOnInit(): void {

      this.geolocationSvc.permission$
        .then( (status)=> {
          this.permissionActive = status === 'granted';
        
          if(this.permissionActive){
            this.geolocationSvc.requestGeolocation()
          }
        });

    
  }

}
