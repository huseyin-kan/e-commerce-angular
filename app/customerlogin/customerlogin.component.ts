import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Customers } from './customer';

@Component({
  selector: 'app-customerlogin',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.css']
})
export class CustomerloginComponent implements OnInit {
  path = " http://localhost:3000/customers";
  public loginForm!:FormGroup;
  constructor(private http:HttpClient,
    private formBuilder:FormBuilder,
    private route:Router,
    private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      userName:[''],
      password:['']
    })
  }
  loggedIn=false

  login(){
    this.http.get<any>(this.path).subscribe(res=>{
      const user =res.find((a:Customers)=>{
        return a.userName===this.loginForm.value.userName && a.password===this.loginForm.value.password
      })
      if(user){
        this.loggedIn=true
        localStorage.setItem("customer",this.loginForm.value.userName)
        this.alertifyService.alert("Logined Successfully")
        this.loginForm.reset()
        this.route.navigate(['products'])
        .then(()=>{
          window.location.reload()
          
        })
      }
      else{
        this.alertifyService.error("User Not Found")
      }
    })
  }

}
