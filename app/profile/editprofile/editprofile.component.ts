import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from 'src/app/customerlogin/customer';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  public editForm!:FormGroup
  id=0
  passwordType:string='password'
  passwordShown:boolean=false
  constructor(private formBuilder:FormBuilder,
    private alertifyService:AlertifyService,
    private router:Router,
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
      name:['',Validators.required],
      imageUrl:['',Validators.required],
      phone:[0,Validators.required],
      address:['',Validators.required],
      email:['',Validators.required]
    })
    
    if(localStorage.getItem("customer")!==null){
      this.customerService.getCustomer().subscribe(res=>{
        let user:any=[]
        user = res.find((a:Customers)=>{
          if(a.userName===localStorage.getItem("customer")){
            this.id=a.id
            this.customerService.getCustomerById(this.id).subscribe((res:any)=>{
              this.editForm=this.formBuilder.group({
                userName:[res.userName],
                password:[res.password],
                name:[res.name],
                phone:[res.phone],
                imageUrl:[res.imageUrl],
                email:[res.email],
                address:[res.address]
        
              })
            })
          }
        })
      })
    }
  }

   setCustomer(){
    if(localStorage.getItem("customer")!==null){
      this.customerService.getCustomer().subscribe(res=>{
        let user:any=[]
        user=res.find((a:Customers)=>{
          if(a.userName===localStorage.getItem("customer")){
            this.id=a.id
            this.customerService.updateCustomers(this.editForm.value,this.id).subscribe((res:any)=>{
              this.alertifyService.success("Profile Changed Successfully")
              this.router.navigate(['profile'])
            })
          }
        })
      })
    }
   }

   passwordShow(){
    if(this.passwordShown){
      this.passwordShown=false
      this.passwordType='password'
    }
    else{
      this.passwordShown=true
      this.passwordType='text'
    }
   }
  

}
