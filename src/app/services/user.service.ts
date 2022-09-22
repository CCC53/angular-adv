import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm, UserLoginRes } from 'src/types/auth';
import { UpdateProfileForm, UpdateUserResp, User } from '../../types/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.api_url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  get id(): string {
    return this.authService.user._id;
  }

  get token(): string {
    return this.authService.token;
  }

  get user(): User {
    return this.authService.user;
  }

  get image(): string {
    return this.authService.user.image;
  }

  createUser(formData: RegisterForm): Observable<UserLoginRes> {
    return this.http.post<UserLoginRes>(`${this.url}/users`, formData).pipe(
      tap(({token}) => localStorage.setItem('token', token)),
      catchError((error) => {
        throw error.error.message;
      })
    )
  }

  updateUserProfile(formData: UpdateProfileForm): Observable<UpdateUserResp> {
    return this.http.put<UpdateUserResp>(`${this.url}/users/${this.id}`, formData, { headers: { 'Authorization': this.token }}).pipe(
      catchError((error) => {
        throw error.error.message
      })
    )
  }
}
