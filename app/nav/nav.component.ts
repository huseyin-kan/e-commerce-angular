import { Component, OnInit } from '@angular/core';
import { SearchServiceService } from '../services/search-service.service';
import { Nav } from './nav';
import { NavService } from '../services/nav.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  
})
export class NavComponent implements OnInit {

  constructor(private filter:SearchServiceService,
    private navService:NavService,
    private alertifyService:AlertifyService,
    private router:Router) { }
  public searchTerm:string="";

  nav:Nav[]=[

  ]

  ngOnInit(): void {
    this.navService.getCategories().subscribe((data:Nav[])=>{this.nav=data});
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    this.filter.search.next(this.searchTerm)
  }

  isLoggedIn(){
    if((localStorage.getItem("isLogged") !== null) || (localStorage.getItem("customer") !== null)){
      return false
    }
    else{
      return true
    }
  }
  logOut(){
    localStorage.removeItem("isLogged")
    localStorage.removeItem("customer")
    this.router.navigate(['products'])
          .then(() => {
            window.location.reload();
          });
    this.alertifyService.alert("Log out successfuly")
  }
}
