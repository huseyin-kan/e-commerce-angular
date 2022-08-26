import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList:any=[]
  public productList=new BehaviorSubject<any>([])
  constructor() { }


  getProducts(){
    return this.productList.asObservable()
  }
  addProducts(product:any){
    this.cartItemList.push(product)
    this.productList.next(this.cartItemList)
    this.getTotalPrice()
  }

  setProducts(product:any){
    this.cartItemList.push(...product)
    this.productList.next(product)
  }

  getTotalPrice():number{
    let totalGrand:number=5
    this.cartItemList.map((a:any)=>{
      if(a.isDiscounted==="true"){
        
        totalGrand+=a.discountPrice
      }
      else{
        totalGrand+=a.total;
      }
      
    })
    return totalGrand
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList)
  }
  removeAllCartItem(){
    this.cartItemList=[]

    this.productList.next(this.cartItemList)
  }

  isAdded(){
    if(this.cartItemList===[]){
      return false
    }
    return true
  }

  getCartItems(){
    if(this.cartItemList.length===0){
      return null
      
    }
    else{
      return this.cartItemList
    }
    
  }
}
