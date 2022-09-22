import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import Swal from 'sweetalert2';
import { fields } from './login.component.fields';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from 'src/types/auth';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  
  @ViewChild('googleDiv') googleDiv : ElementRef = {} as ElementRef;
  @ViewChild('googleButton') googleButton : ElementRef = {} as ElementRef;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = fields;
  model: LoginForm = { email: localStorage.getItem('email') || '', remember: Boolean(localStorage.getItem('remember')) || false } as LoginForm;
  auth: any;

  constructor(private router: Router, private authService: AuthService, private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.renderButton();
  }
  
  ngOnInit(): void {
  }

  onSubmit(model: LoginForm) {
    this.authService.login(model).subscribe({ 
      next: res => {
        if (model.remember) {
          localStorage.setItem('remember', String(model.remember));
          localStorage.setItem('email', model.email);
        } else {
          localStorage.removeItem('remember');
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      error: error => Swal.fire({ title: 'Error', icon: 'error', text: error })
    });
  }

  attachSignin(element: ElementRef) {
    this.auth.attachClickHandler(element, {}, (user: any) => {
      const token = user.getAuthResponse().id_token;
      this.authService.loginGoogle(token).subscribe(() => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      });
    });
  } 

  async startApp() {
    await this.authService.initGoogle();
    this.auth = this.authService.auth;
    this.attachSignin(this.googleDiv.nativeElement);
  };

  renderButton() {
    gapi.signin2.render(this.googleButton.nativeElement, {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

}