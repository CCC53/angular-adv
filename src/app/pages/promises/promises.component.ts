import { Component, OnInit } from '@angular/core';
import { UserTest, Response } from '../../../types/promises';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(res => console.log(res));
  }

  async getUsers(): Promise<UserTest[]>  {
    const res = await fetch('https://reqres.in/api/users');
    const { data } = await res.json() as Response;
    return data;
  }

}