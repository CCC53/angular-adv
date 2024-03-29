import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UploadResp } from 'src/types/upload';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UploadTypes } from '../../types/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  apiUrl: string = environment.api_url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  uploadImage(type: UploadTypes, id: string, file: File): Observable<UploadResp> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResp>(`${this.apiUrl}/upload/${type}/${id}`, formData).pipe(
      catchError(error => {
        console.log(error);
        return of({ imageUploaded: null })
      })
    )
  }

}
