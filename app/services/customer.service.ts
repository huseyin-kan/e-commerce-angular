import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customers } from '../customerlogin/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  path="http://localhost:3000/customers"
  constructor(private http:HttpClient) { }

  getCustomer(){
    return this.http.get<any>(this.path)
  }

  getCustomerById(id:number){
    return this.http.get<any>(this.path +"/" +id)
  }

  updateCustomers(data:Customers,id:number){
    return this.http.put<Customers>(this.path + "/" + id,data)
  }
  deleteCustomer(id:number){
      return this.http.delete<Customers>(this.path + "/" +id).pipe(map((res:any)=>{return res}))

  }

  addCartItems(id:number,data:any){
    return  this.http.post<any>(this.path +"/"+id,data)
  }
}
