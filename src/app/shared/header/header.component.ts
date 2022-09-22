import { Component, OnInit } from '@angular/core';
import { User } from 'src/types/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  
  user: User;

  constructor(private authService: AuthService) {
    this.user = authService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
