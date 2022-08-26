import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../customerlogin/customer';
import { Orders } from '../order/order';
import { AlertifyService } from '../services/alertify.service';
import { CartService } from '../services/cart.service';
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  order:Orders=new Orders()
  dateTime=new Date()
  isUsed:boolean=false
  public products:any
  public grandTotal:number=0
  customerPath=" http://localhost:3000/customers";
  constructor(private cartService:CartService,
    private alertifyService:AlertifyService,
    private customerService:CustomerService,
    private http:HttpClient,
    private orderService:OrderService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res=>{
      this.products=res
      this.grandTotal=this.cartService.getTotalPrice()
    })
  }
  removeItem(item:any){
    this.cartService.removeCartItem(item)
  }
  removeAllItems(){
    this.cartService.removeAllCartItem()
  }

  isLoggedIn(){
    if(localStorage.getItem("customer")!==null || localStorage.getItem("isLogged")!==null){
      return true
    }
    else{
      return false
    }
  }

  enterCode(){
    if(!this.isUsed){
      if((<HTMLInputElement>document.getElementById("code")).value==="afmc3"){
        this.grandTotal-=200
        this.alertifyService.success("You had a 200$ discount")
        this.isUsed=true  
      }
      else if((<HTMLInputElement>document.getElementById("code")).value==="sfm9"){
        this.grandTotal-=200
        this.alertifyService.success("You had a 200$ discount")
        this.isUsed=true
      }
      else if((<HTMLInputElement>document.getElementById("code")).value==="ecm33"){
        this.grandTotal-=200
        this.alertifyService.success("You had a 200$ discount")
        this.isUsed=true
      }
    }
    else{
      this.alertifyService.error("You already used a code")
    }
    
  }
  getCartItems(){
    this.http.get<any>(this.customerPath).subscribe(res=>{
      let customer:any=[]

      customer=res.find((a:Customers)=>{
        if(a.userName===localStorage.getItem("customer")){
          let data=this.cartService.getCartItems()
          let id=a.id
          console.log(data)
          if(data===null){
            this.alertifyService.error("First you must add some products in your cart")

          }else{
            
            const data1={order:data}
            const customerId={customerId:id}
            const price={grandTotal:this.grandTotal}
            const date={date:this.dateTime.toLocaleString()}
            this.order=Object.assign({},data1,customerId,price,date)

            this.orderService.addOrders(this.order).subscribe(res=>{
              this.alertifyService.success("Your order has been recieved")
            })
          }
          
          
          
        }
      })
    })

  }
}
