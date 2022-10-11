import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {
    this.user = authService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(value: string) {
    if (!value) {
      return;
    }
    this.router.navigateByUrl(`dashboard/search/${value}`);
  }

}
