import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  currentUrl: any;
  ticketData: any;
  form: FormGroup
  submitted: boolean
  ticketConversations: any = [];
  constructor(private service: ApiService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      message: ['', [Validators.required]],
      user: ['', [Validators.required]],
      ticketNo: ['', [Validators.required]],
    })



    this.currentUrl = this.route.snapshot.params;
    this.service.getAllTicketByTicketNo(this.currentUrl.id).subscribe(data => {
      this.ticketData = data

    });
    // this.allTicketConversation()
    this.getTicketConversation()
  }

  sendMessage() {
    this.submitted = true
    this.form.get('user').setValue(this.loggedInUser.email);
    this.form.get('ticketNo').setValue(this.currentUrl.id);
    console.log(this.form.value)

    this.service.sendMessage(this.form.value).subscribe((res: any) => {
      // console.log(res);
      this.submitted = false
      this.getTicketConversation()
      this.form.reset()

    })
  }

  allTicketConversation() {
    this.service.getAllTicketConversation().subscribe((res: any) => {
      // console.log(res);

    })
  }

  getTicketConversation() {
    this.service.getConversationByTicketNo(this.currentUrl.id).subscribe((res: any) => {
      console.log(res);
      this.ticketConversations = res

    })
  }
  closeTicket() {
    console.log("clicked closed ticket")
  }

}
