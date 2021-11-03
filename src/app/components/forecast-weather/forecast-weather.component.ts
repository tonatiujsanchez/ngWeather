import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.sass']
})
export class ForecastWeatherComponent implements OnInit {

  constructor(
    public forecastSvc: ForecastService
  ) { }

  ngOnInit(): void {
  }

}
