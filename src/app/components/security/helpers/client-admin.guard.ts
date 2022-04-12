import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAdminGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = sessionStorage.getItem('token');
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    var loggedInUserRole = loggedInUser?.userType?.name

    if (token && loggedInUserRole === "client admin") {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["support"]);
    return false;
  }

}
