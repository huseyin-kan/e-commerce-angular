import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Nav } from '../nav/nav';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  path=" http://localhost:3000/categories";
  constructor(private http:HttpClient) { }

  getCategories():Observable<Nav[]>{
    return this.http.get<Nav[]>(this.path)
  }
}
