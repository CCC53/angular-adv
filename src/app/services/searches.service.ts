import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResp, ValidCollections } from 'src/types/search';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  
  private url: string = environment.api_url;

  constructor(private http: HttpClient) { }

  searchByCollection(collection: ValidCollections, page: number, search: string): Observable<SearchResp> {
    return this.http.get<SearchResp>(`${this.url}/search/${collection}/${search}?page=${page}`)
  }

}
