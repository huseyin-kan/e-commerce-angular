import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nav } from 'src/app/nav/nav';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NavService } from 'src/app/services/nav.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';
import { ProductsComponent } from '../products.component';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private alertifyService:AlertifyService,
    private productService:ProductService,
    private navService:NavService,
    private productComponent:ProductsComponent,
    private activatedRoute:ActivatedRoute) { }

  productUpdateForm!:FormGroup;
  product:Product=new Product()
  nav:Nav[]=[];

  
  ngOnInit(): void {
    this.productUpdateForm=this.formBuilder.group({

      name:["",Validators.required],
      description:["",Validators.required],
      price:[0,Validators.required],
      discountPrice:[0,Validators.required],
      ratio:[0,Validators.required],
      imageUrl:["",Validators.required],
      categoryId:["",Validators.required],
      isDiscounted:["false",Validators.required]
    })
    this.navService.getCategories().subscribe(data=>{
      this.nav=data;
    })
    
    this.productService.getProductsById(this.activatedRoute.snapshot.params.id).subscribe((res:any)=>{
      this.productUpdateForm=this.formBuilder.group({
      name:[res.name],
      description:[res.description],
      price:[res.price],
      discountPrice:[res.discountPrice],
      ratio:[res.ratio],
      imageUrl:[res.imageUrl],
      categoryId:[res.categoryId],
      isDiscounted:[res.isDiscounted]

      })
    })
  }
  setProduct(){
    this.productService.updateProducts(this.productUpdateForm.value,this.activatedRoute.snapshot.params.id,).subscribe((res:Product)=>{
      this.alertifyService.success(res.name +" Changed Successfuly")
    })
  }

}
