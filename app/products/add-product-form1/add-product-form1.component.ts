import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Nav } from 'src/app/nav/nav';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NavService } from 'src/app/services/nav.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-product-form1',
  templateUrl: './add-product-form1.component.html',
  styleUrls: ['./add-product-form1.component.css'],
  providers:[NavService,ProductService]
})
export class AddProductForm1Component implements OnInit {


  constructor(private formBuilder:FormBuilder,
    private navservice:NavService,
    private productService:ProductService,
    private alertifyService:AlertifyService,
    private router:Router) { }
  
  
  
    productAddForm!:FormGroup;
  product:Product=new Product()
  nav:Nav[]=[];
  ngOnInit(): void {
    this.productAddForm=this.formBuilder.group({

      name:["",Validators.required],
      description:["",Validators.required],
      price:[0,Validators.required],
      imageUrl:["",Validators.required],
      categoryId:["",Validators.required],
      isDiscounted:["false",Validators.required]
    })
    this.navservice.getCategories().subscribe(data=>{
      this.nav=data;
    })
  }

  add(){
    if(this.productAddForm.valid){
      this.product =Object.assign({},this.productAddForm.value)
    }
    this.productService.addProducts(this.product).subscribe((data)=>{
      this.alertifyService.success(data.name + "Added Successfuly")
      this.router.navigate(['products'])
    })
  }
}
