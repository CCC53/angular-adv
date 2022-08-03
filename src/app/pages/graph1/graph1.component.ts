import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component implements OnInit {

  title1: string = 'LATAM';
  data1: ChartData<'doughnut'> = {
    labels: ['Leviatán', 'KRÜ Esports', 'FUSION', 'E-Xolos LAZER'],
    datasets: [
      { data: [355, 325, 110, 105], backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#3181EA'] }
    ]
  }

  title2: string = 'Brazil';
  data2: ChartData<'doughnut'> = {
    labels: ['LOUD', 'Ninjas in Pyjamas', 'Keyd Stars', 'FURIA Esports'],
    datasets: [
      { data: [650, 225, 115, 90], backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#3181EA'] }
    ]
  }

  title3: string = 'North America';
  data3: ChartData<'doughnut'> = {
    labels: ['OpTic Gaming', 'XSET', 'The Guard', 'FaZe Clan'],
    datasets: [
      { data: [1250, 295, 220, 75], backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#3181EA'] }
    ]
  }

  title4: string = 'EMEA';
  data4: ChartData<'doughnut'> = {
    labels: ['FunPlus Phoenix', 'Fnatic', 'G2 Esports', 'Guild Esports'],
    datasets: [
      { data: [600, 525, 305, 300], backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#3181EA'] }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
