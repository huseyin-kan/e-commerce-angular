import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  path=" http://localhost:3000/orders"
  addOrders(order:Orders):Observable<Orders>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }


    return this.http.post<Orders>(this.path,order,httpOptions)
  }
  getOrders(){
    return this.http.get<any>(this.path)
  }
  getOrdersByCustomerId(customerId:number){
    let newPath=this.path
    if(customerId){
      newPath +="?customerId="+customerId
    }
    return this.http.get<Orders[]>(newPath);
  }
}
