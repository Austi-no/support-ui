import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit {
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  ticketList: any = [];
  superAdmin: boolean;

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit() {
    this.getTickets()
    this.superAdmin = this.loggedInUser?.userType?.name === "superadmin";

  }


  getTickets() {
    this.service.getAllTickets().subscribe((res: any) => {
      this.ticketList = res.filter(x =>
        (x.user.email === this.loggedInUser.email) || this.loggedInUser.userType.name == "superadmin" || ((x.organisation.name == this.loggedInUser.organisation.name) && (this.loggedInUser.userType.name == "client admin")));



    })
  }

  gotoTicketConversations(ticketNo: any) {
    this.router.navigate(['support/conversations']);
  }


  gotoOpenNewTicket() {
    this.router.navigate(['support/new-ticket']);
  }



}
