import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm, UserRes, LoginForm } from '../auth/types/auth';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.api_url;
  public auth: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.initGoogle();
  }

  createUser(formData: RegisterForm): Observable<UserRes> {
    return this.http.post<UserRes>(`${this.url}/users`, formData).pipe(
      tap(({token}) => localStorage.setItem('token', token)),
      catchError((error) => {
        throw error.error.message;
      })
    )
  }

  loginUser(formdata: LoginForm): Observable<UserRes> {
    return this.http.post<UserRes>(`${this.url}/auth`, formdata).pipe(
      tap(({token}) => localStorage.setItem('token', token)),
      catchError(error => {
        throw error.error.message
      })
    );
  }

  loginGoogle(token: string): Observable<UserRes> {
    return this.http.post<UserRes>(`${this.url}/auth/google`, {token}).pipe(
      tap(({token}) => localStorage.setItem('token', token)),
      catchError(error => {
        throw error.error.message
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<UserRes>(`${this.url}/auth/renew`, { headers: { 'Authorization': token } }).pipe(
      tap(({token}) => localStorage.setItem('token', token)),
      map(({token}) => token ? true : false ),
      catchError(error => of(false))
    )
  }

  logout() {
    localStorage.removeItem('token');
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

}
