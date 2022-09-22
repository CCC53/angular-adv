import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { fields } from './register.component.fields';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../../services/user.service';
import { RegisterForm } from 'src/types/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = fields;
  model: RegisterForm = {} as RegisterForm;
  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(model: RegisterForm) {
    if (this.form.invalid) {
      return;
    }
    this.userService.createUser(model).subscribe({
      next: res => this.router.navigateByUrl('/'),
      error: error => Swal.fire({ title: 'Error', icon: 'error', text: error })
    });
  }

}