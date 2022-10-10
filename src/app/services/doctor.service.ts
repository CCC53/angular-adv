import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddDoctorRes, DeleteDoctorResp, DoctorFormData, GetDoctorResp, GetDoctorsResp, UpdateDoctorRes } from '../../types/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  url: string = environment.api_url;

  constructor(private http: HttpClient) { }

  getDoctors(page: number): Observable<GetDoctorsResp> {
    return this.http.get<GetDoctorsResp>(`${this.url}/doctors?page=${page}`);
  }

  getDoctor(id: string): Observable<GetDoctorResp> {
    return this.http.get<GetDoctorResp>(`${this.url}/doctors/${id}`);
  }

  addDoctor(data: DoctorFormData): Observable<AddDoctorRes> {
    return this.http.post<AddDoctorRes>(`${this.url}/doctors`, data);
  }

  updateDoctor(id: string, data: DoctorFormData): Observable<UpdateDoctorRes> {
    return this.http.put<UpdateDoctorRes>(`${this.url}/doctors/${id}`, data);
  }

  deleteDoctor(id: string): Observable<DeleteDoctorResp> {
    return this.http.delete<DeleteDoctorResp>(`${this.url}/doctors/${id}`);
  }

   
}
