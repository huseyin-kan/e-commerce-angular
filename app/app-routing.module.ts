import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CLoginGuard } from './customerlogin/clogin.guard';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { OrderComponent } from './order/order.component';

import { AddProductForm1Component } from './products/add-product-form1/add-product-form1.component';
import { DiscountComponent } from './products/discount/discount.component';
import { ProductsComponent } from './products/products.component';
import { UpdateProductFormComponent } from './products/update-product-form/update-product-form.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'search/:searchTerm',component:ProductsComponent},
  {path:'products',component:ProductsComponent},
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'products/category/:categoryId',component:ProductsComponent},
  {path:'add-product-form1',component:AddProductForm1Component,canActivate:[LoginGuard]},
  {path:'login',component:LoginComponent},
  {path:'update-product-form/:id',component:UpdateProductFormComponent},
  {path:'cart',component:CartComponent},
  {path:'signup',component:SignupComponent},
  {path:'clogin',component:CustomerloginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[CLoginGuard]},
  {path:'edit-profile',component:EditprofileComponent},
  {path:'orders/:customerId',component:OrderComponent},
  {path:'discount/:id',component:DiscountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
