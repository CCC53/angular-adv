import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GetUsersResp, User } from '../../../types/user';
import { SearchesService } from '../../services/searches.service';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  @ViewChild('inputSearch') search: ElementRef = {} as ElementRef;
  
  data: GetUsersResp = {
    total: 0,
    users: []
  }
  page: number = 0;
  loading: boolean = true;
  newImageSub: Subscription = new Subscription();

  constructor(private userService: UserService, private searchService: SearchesService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.newImageSub = this.modalService.newImage.subscribe(image => {
      this.loadUsers();
    })
  }

  ngOnDestroy(): void {
    this.newImageSub.unsubscribe();
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
    this.search.nativeElement.value.length > 0 ? this.loadUsersSearch(this.search.nativeElement.value) : this.loadUsers();
  }

  searchUser(search: string) {
    if (search.length === 0) {
      this.loadUsers();
      return;
    }
    this.loadUsersSearch(search);
  }

  loadUsersSearch(search: string) {
    this.searchService.searchByCollection('users', this.page, search).subscribe(res => {
      this.data.total = res.total;
      this.data.users = res.data;
    })
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(res => {
          if (res.deleted) {
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
            this.loadUsers();
          }
        })
      }
    })
  }

  validateDeleteLogged(id: string): boolean {
    return this.userService.id === id ? false : true;
  }

  changeRole(user: User) {
    this.userService.updateUser(user, user._id).subscribe(res => console.log(res));
  }

  openModal(id: string, image: string) {
    this.modalService.openModal(id, 'users', image);
  }
}
