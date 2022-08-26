import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginComponent: LoginComponent, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // let logged = this.loginComponent.isLoggedIn()

    if (localStorage.getItem("isLogged") === null) {
      this.router.navigate(['/login'])
      return false;
    }
    

    return true;
  }

}
