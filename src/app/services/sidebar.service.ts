import { Injectable } from '@angular/core';
import { SideBarMenu } from '../../types/shared';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sidebarMenu: SideBarMenu[] = [
    { 
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      routes: [
        { title: 'Main', url: '' },
        { title: 'Progress Bar', url: 'progress' },
        { title: 'Graphs', url: 'graph1' },
        { title: 'Promises', url: 'promises' },
        { title: 'RXJS', url: 'rxjs' }
      ]
    },
    {
      title: 'Core',
      icon: 'mdi mdi-folder-lock-open',
      routes: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' }
      ]
    }
  ]

  constructor() { }
}
