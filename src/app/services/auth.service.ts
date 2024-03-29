import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm, UserLoginRes, UserRenewTokenRes } from 'src/types/auth';
import { User } from 'src/types/user';
import { SideBarMenu } from '../../types/shared';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  auth: any;
  user: User = {} as User;
  private url: string = environment.api_url;

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.initGoogle();
  }

  login(formdata: LoginForm): Observable<UserLoginRes> {
    return this.http.post<UserLoginRes>(`${this.url}/auth`, formdata).pipe(
      tap(({token, menu}) => this.loadDataToLocalStorage(token, menu)),
      catchError(error => {
        throw error.error.message
      })
    );
  }

  loginGoogle(token: string): Observable<UserLoginRes> {
    return this.http.post<UserLoginRes>(`${this.url}/auth/google`, {token}).pipe(
      tap(({token, menu}) => this.loadDataToLocalStorage(token, menu)),
      catchError(error => {
        throw error.error.message
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get<UserRenewTokenRes>(`${this.url}/auth/renew`).pipe(
      map(({token, user, menu}) => {
        this.loadDataToLocalStorage(token, menu)
        this.user = user;
        return true;
      }),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    )
  }

  logout() {
    this.removeDataFromLocalStorage()
    this.auth.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  initGoogle() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth = gapi.auth2.init({
          client_id: environment.client_id,
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth);
      });
    })
  }

  loadDataToLocalStorage(token: string, menu: SideBarMenu[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  removeDataFromLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }
}