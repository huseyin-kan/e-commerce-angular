import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {


  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private alertifyService:AlertifyService,
    private router:Router) { }
  discountProduct!:FormGroup;
  product:any=[]
  prdct:Product=new Product()

  ngOnInit(): void {
    this.discountProduct=this.formBuilder.group({

      
      price:[0,Validators.required],
      discount:[0,Validators.required]

    })
    this.productService.getProductsById(this.activatedRoute.snapshot.params.id).subscribe((res:any)=>{
      this.prdct=res
      console.log(this.product)
      this.discountProduct=this.formBuilder.group({
      price:[res.price],
      discount:[res.discountPrice]
      })
    })
  }

 

  setProduct(){
    const dcPrice={discountPrice:this.discountProduct.controls['discount'].value}
    console.log(dcPrice)
    const ratio={ratio:Math.floor(((this.discountProduct.controls['price'].value-this.discountProduct.controls['discount'].value)/this.discountProduct.controls['price'].value)*100)}
    console.log(((this.discountProduct.controls['price'].value-this.discountProduct.controls['discount'].value)/this.discountProduct.controls['price'].value)*100)
    const isDiscounted={isDiscounted:"true"}
    this.product=Object.assign({},this.prdct,dcPrice,ratio,isDiscounted)
    console.log(this.product)

    this.productService.updateProducts(this.product,this.activatedRoute.snapshot.params.id).subscribe((res:Product)=>{
      this.alertifyService.success(res.name +" Discounted")
      this.router.navigate(['products'])
    })

  }
  removeDiscount(){
    const dcPrice={discountPrice:this.discountProduct.controls['price'].value}
    const ratio={ratio:0}
    const isDiscounted={isDiscounted:"false"}
    this.product=Object.assign({},this.prdct,dcPrice,ratio,isDiscounted)
    console.log(this.product)

    this.productService.updateProducts(this.product,this.activatedRoute.snapshot.params.id).subscribe((res:Product)=>{
      this.alertifyService.success(res.name +"'s discount removed")
      this.router.navigate(['products'])
    })
  }
}
