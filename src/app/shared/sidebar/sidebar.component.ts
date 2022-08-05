import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SideBarMenu } from '../../../types/shared';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  sidebarMenu: SideBarMenu[];

  constructor(private sideBarService: SidebarService) {
    this.sidebarMenu = this.sideBarService.sidebarMenu;
  }

  ngOnInit(): void {
  }

}
