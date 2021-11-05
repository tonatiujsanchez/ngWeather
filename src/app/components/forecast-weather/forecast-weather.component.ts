import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import { showUpStaggered } from '../../animations/showup.animation';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.sass'],
  animations: [showUpStaggered]
})
export class ForecastWeatherComponent implements OnInit {

  constructor(
    public forecastSvc: ForecastService
  ) { }

  ngOnInit(): void {
  }

}
