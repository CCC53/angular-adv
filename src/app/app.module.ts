import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { formValidators } from './validators/formValidators';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ ...formValidators }),
    FormlyBootstrapModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
