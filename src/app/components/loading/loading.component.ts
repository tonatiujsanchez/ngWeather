import { Component, OnInit } from '@angular/core';
import { loadingAnimation } from '../../animations/loading.animation';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
  animations: [ loadingAnimation() ]
})
export class LoadingComponent implements OnInit {

  _elements: string[] = ['#FFE5EC', '#FF80A0', '#FF2E63', '#800020', '#1A0006'];
  elements: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.set();
  }

  set(){
    this.elements = this._elements;
    this.scheduleNextIteration();
  }
  scheduleNextIteration(){
    setTimeout(() => {
      if( this.elements.length === 0 ){
        this.set();
        return;
      }
      this.clear();
    }, 100 * this._elements.length + 300);
  }

  clear(){
    this.elements = [];
    this.scheduleNextIteration();
  }

}
