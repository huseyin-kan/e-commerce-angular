import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, observable } from 'rxjs';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path=" http://localhost:3000/products";

  constructor(private http:HttpClient) { }

  getProducts(categoryId:number):Observable<Product[]>{
    let newPath=this.path
    if(categoryId){
      newPath +="?categoryId="+categoryId
    }

    return this.http.get<Product[]>(newPath);

  }
  getAllProducts(){

    return this.http.get<Product[]>(this.path);

  }

  addProducts(product:Product):Observable<Product>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }


    return this.http.post<Product>(this.path,product,httpOptions)
  }
  homePage(){
    return this.http.get<Product[]>(this.path);
  }

  updateProducts(data:Product,id:number){
    return this.http.put<Product>(this.path +"/" +id,data)
  }

  deleteProducts(id:number){
    return this.http.delete<Product>(this.path + "/" +id).pipe(map((res:any)=>{return res}))
  }
  getProductsById(id:number){
    return this.http.get<Product>(this.path +"/" +id)

  }


}
