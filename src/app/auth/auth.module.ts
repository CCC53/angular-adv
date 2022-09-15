import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule,
    HttpClientModule
  ]
})
export class AuthModule { }
