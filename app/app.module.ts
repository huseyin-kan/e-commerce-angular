import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter.pipe';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AddProductForm1Component } from './products/add-product-form1/add-product-form1.component';
import { UpdateProductFormComponent } from './products/update-product-form/update-product-form.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { OrderComponent } from './order/order.component';
import { DiscountComponent } from './products/discount/discount.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CategoryComponent,
    ProductsComponent,
    FilterPipe,
    LoginComponent,
    AddProductForm1Component,
    UpdateProductFormComponent,
    CartComponent,
    SignupComponent,
    CustomerloginComponent,
    ProfileComponent,
    EditprofileComponent,
    OrderComponent,
    DiscountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginComponent,ProductsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
