import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { showUp } from '../../animations/showup.animation';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  animations: [showUp]
})
export class CurrentWeatherComponent implements OnInit {

  constructor(
    public weatherSvc: CurrentWeatherService
  ) { }

  ngOnInit(): void {

  }

}
