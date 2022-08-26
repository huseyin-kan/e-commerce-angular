import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public signUpForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private alertifyService:AlertifyService,private router:Router) { }
  path="http://localhost:3000/customers";
  ngOnInit(): void {
    this.signUpForm=this.formBuilder.group({
      userName:[''],
      password:[''],
      name:[''],
      phone:[''],
      address:[''],
      email:['']
    })
  }

  signUp(){
    this.http.post<any>(this.path,this.signUpForm.value).subscribe(res=>{
      this.alertifyService.success("Signed up successfully")
      this.signUpForm.reset()
      this.router.navigate(['clogin'])
    })
  }
}
