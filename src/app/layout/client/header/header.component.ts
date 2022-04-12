import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  settingsMenu: any;
  clientMenu: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.settingsMenu = this.loggedInUser?.userType?.name === "superadmin";
    this.clientMenu = this.loggedInUser?.userType?.name === "client admin";
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['']);
  }
  gotoDashboard() {
    this.router.navigate(['support']);
  }


}
