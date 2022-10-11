import { Injectable } from '@angular/core';
import { SideBarMenu } from '../../types/shared';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  loadSidebarMenu(): SideBarMenu[] {
    const menu = localStorage.getItem('menu');
    return menu && JSON.parse(menu);
  }
}
