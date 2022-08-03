import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent implements OnInit {

  progress1: number = 20;
  progress2: number = 25;

  get percentage1() : string {
    return `${this.progress1}%`;
  }

  get percentage2() : string {
    return `${this.progress2}%`;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
