import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '../services/search-service.service';
import { AlertifyService } from '../services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { FormBuilder,FormGroup} from '@angular/forms';
import { Nav } from '../nav/nav';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductService]
})
export class ProductsComponent implements OnInit {

  constructor(private filter:SearchServiceService,
    private alertifyService:AlertifyService,
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private cartService:CartService) { }
  searchTerm:string="";
  products:Product[]=[]
  nav:Nav[]=[];
  isDiscounted=false;


  ngOnInit(): void {
    this.filter.search.subscribe((val:any)=>{
      this.searchTerm=val;
    })
    
    this.activatedRoute.params.subscribe((params:any)=>{
      this.productService.getProducts(params["categoryId"]).subscribe((data:Product[])=>{
        this.products=data
        this.products.forEach((a:any)=>{
          Object.assign(a,{quantity:1,total:a.price})
        })
      });
    })
    

  }


  addToCart(product:Product){
    this.alertifyService.success(product.name + " Added to cart")
    this.cartService.addProducts(product)
  }

  isLoggedIn(){
    if(localStorage.getItem("isLogged") === null){
      return false
    }
    else{
      return true
    }
  }
  openModal() {
    this.router.navigate(['update-product-form'])

  }

  deleteProduct(product:Product){
    this.productService.deleteProducts(product.id).subscribe(res=>{
      this.alertifyService.success(product.name + " deleted");
      this.activatedRoute.params.subscribe((params:any)=>{
        this.productService.getProducts(params["categoryId"]).subscribe((data:Product[])=>{this.products=data});
      })
    })
  }

}
