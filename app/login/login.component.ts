import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../category/users';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private accountService:AccountService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    })
  }
  loggedIn = false
  login() {
    this.accountService.getUsers().subscribe(res => {
      const user = res.find((a: Users) => {
        return a.userName === this.loginForm.value.userName && a.password === this.loginForm.value.password
      });
      if (user) {
        this.loggedIn = true;
        localStorage.setItem("isLogged", this.loginForm.value.userName)
        this.alertifyService.success("Logined successfully")
        this.loginForm.reset()
        this.router.navigate(['products'])
          .then(() => {
            window.location.reload();
          });
      }
      else {
        this.alertifyService.error("User Not Found!")
      }
    })
  }

  isLoggedIn() {
    console.log(" is logged " + this.loggedIn)
    return this.loggedIn
  }

  logOut() {
    localStorage.removeItem("isLogged")
    this.loggedIn = false
  }
}
