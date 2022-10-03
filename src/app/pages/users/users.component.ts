import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GetUsersResp } from '../../../types/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: GetUsersResp = {
    total: 0,
    users: []
  }
  page: number = 0;
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page).subscribe(res => {
      this.data = res;
      this.loading = false;
    });
  }

  changePage(change: number) {
    this.page += change;
    if (this.page < 0) {
      this.page = 0;
    } else if (this.page >= this.data.total) {
      this.page -= change;
    }
    this.loadUsers();
  }

}
