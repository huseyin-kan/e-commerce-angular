import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Orders } from './order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order:Orders[]=[]
  orderName:any[]=[]
  totalGrand:number=0
  constructor(private orderService:OrderService,
    private http:HttpClient,
    private activatedRoute:ActivatedRoute) { }
    
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any)=>{
      this.orderService.getOrdersByCustomerId(params['customerId']).subscribe((data:Orders[])=>{
        this.order=data
        console.log(this.order)
        for(let i=0;i<this.order.length;i++){
          this.totalGrand+=this.order[i].grandTotal
        }
        console.log(this.totalGrand)
      })
    })


  }

}
