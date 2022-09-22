import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SideBarMenu } from '../../../types/shared';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/types/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  sidebarMenu: SideBarMenu[];
  user: User;

  constructor(private sideBarService: SidebarService, private authService: AuthService) {
    this.sidebarMenu = this.sideBarService.sidebarMenu;
    this.user = authService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
