import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  caseList: any = [];
  submitted: boolean
  form: FormGroup
  branchList: any = [];
  selectedPassport: any;
  constructor(private service: ApiService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      caseType: ['Select Case Type', Validators.required],
      title: ['', Validators.required],
      accountEnvironment: ['Select Environment', Validators.required],
      description: ['', Validators.required],
      priority: ['Select Priority', Validators.required],
      customerReference: ['', Validators.required],
      location: ['Select Location', Validators.required],
      organisation: [''],
      user: ['']

    })
    this.getBranch()
    this.getCaseType()
  }

  getBranch() {
    this.service.getAllBranches().subscribe((res: any) => {
      this.branchList = res.filter(x => x.organisation.name === this.loggedInUser.organisation.name);
    })
  }
  getCaseType() {
    this.service.getAllCallTypes().subscribe((res: any) => {
      this.caseList = res
      // console.log(res);

    })
  }

  onSelectedFile(e) {
    const file = e.target.files[0];
    console.log(file)
    this.selectedPassport = file;
  }

  createTicket(ticket: any) {

    const formData = new FormData();
    formData.append('caseType', ticket.caseType);
    formData.append('title', ticket.title);
    formData.append('accountEnvironment', ticket.accountEnvironment);
    formData.append('description', ticket.description);
    formData.append('customerReference', ticket.customerReference);
    formData.append('priority', ticket.priority);
    formData.append('location', ticket.location);

    formData.append('file', this.selectedPassport);

    var user = this.loggedInUser.email
    var organisation = this.loggedInUser.organisation.name
    formData.append('user', user);
    formData.append('organisation', organisation);
    // this.form.get('user').setValue(this.loggedInUser.email);
    // this.form.get('organisation').setValue(this.loggedInUser.organisation.name);


    this.service.createTicket(formData).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
        this.form.reset()

        this.toastr.success("", res.message)
      }
      else {
        this.toastr.error("", res.message)
      }
    },
      error => {
        this.toastr.error(error.error.message)
      }
    )
  }
}
