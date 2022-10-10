import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetHospitalsResp, GetHospitalsSelectResp } from 'src/types/hospital';
import { environment } from 'src/environments/environment';
import { CreateHospitalResp, UpdateHospitalResp, DeleteHospitalResp } from '../../types/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  private url: string = environment.api_url;

  constructor(private http: HttpClient) { }

  getHospitals(page: number): Observable<GetHospitalsResp> {
    return this.http.get<GetHospitalsResp>(`${this.url}/hospitals?page=${page}`);
  }

  createHospital(name: string): Observable<CreateHospitalResp> {
    return this.http.post<CreateHospitalResp>(`${this.url}/hospitals`, { name });
  }

  updateHospital(id: string, name: string): Observable<UpdateHospitalResp> {
    return this.http.put<UpdateHospitalResp>(`${this.url}/hospitals/${id}`, { name });
  }

  deleteHospital(id: string): Observable<DeleteHospitalResp> {
    return this.http.delete<DeleteHospitalResp>(`${this.url}/hospitals/${id}`);
  }

  getHospitalsSelect(): Observable<GetHospitalsSelectResp> {
    return this.http.get<GetHospitalsSelectResp>(`${this.url}/hospitals/all`);
  }
}
