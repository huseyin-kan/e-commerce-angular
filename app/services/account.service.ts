import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../category/users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  path=" http://localhost:3000/users";
  constructor(private http:HttpClient) { }

  getUsers(){
    return  this.http.get<any>(this.path)
  }

}
