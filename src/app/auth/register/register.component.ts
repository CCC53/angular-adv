import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { fields } from './register.component.fields';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = fields;
  model = { };
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(model: any) {
    if (this.form.invalid) {
      return;
    }
    this.userService.createUser(model).subscribe({
      next: res => console.log(res),
      error: error => Swal.fire({ title: 'Error', icon: 'error', text: error })
    });
  }

}
