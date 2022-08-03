import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  }

  constructor() { }

  ngOnInit(): void {
  }

}
