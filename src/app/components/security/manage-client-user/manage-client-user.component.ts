import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../service/auth.service';
import { CustomValidationService } from '../validator/custom-validators';

@Component({
  selector: 'app-manage-client-user',
  templateUrl: './manage-client-user.component.html',
  styleUrls: ['./manage-client-user.component.css']
})
export class ManageClientUserComponent implements OnInit {
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  userList: any = [];
  form: FormGroup;
  organisationList: any = [];
  userTypeList: any = [];
  branchList: any = [];

  constructor(private authService: AuthService, private apiService: ApiService, private toastr: ToastrService, private fb: FormBuilder, private validationService: CustomValidationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      organisation: ['Select Organisation', Validators.required],
      userType: ['Select User Type', Validators.required],
      password: ['', [Validators.required]],
      branch: ['Select Branch']

      // createdBy: ['']
    })
    this.getUsers()
    this.getOrganisation()
    this.getUserType()
    this.getBranch()
  }
  getBranch() {
    this.apiService.getAllBranches().subscribe((res: any) => {
      console.log(res);

      this.branchList = res.filter(x => x.organisation.name === this.loggedInUser.organisation.name);
      // console.log(this.branchList);

    })
  }
  getUsers() {
    this.authService.getUsers().subscribe((res: any) => {

      // console.log(res);

      this.userList = res.filter(x => (x.userType.name === "client" || x.userType.name === "client admin") && (x.organisation.name === this.loggedInUser.organisation.name));
      console.log(this.userList);
    })
  }
  getOrganisation() {
    this.apiService.getAllOrganisations().subscribe((res: any) => {
      this.organisationList = res.filter(x => x.name === this.loggedInUser.organisation.name);

    })
  }

  getUserType() {
    this.authService.getAllUserType().subscribe((res: any) => {
      this.userTypeList = res.filter(x => x.name === "client");
      // this.userTypeList = res
    })
  }

  deleteUser(id: any) {
    this.authService.deleteUser(id).subscribe((res: any) => {
      this.toastr.success("", res.message)
      this.getUsers()
    })
  }


  addUser() {
    // this.form.get('createdBy').setValue(this.loggedInUser)
    this.authService.saveClientUser(this.form.value).subscribe((res: any) => {
      if (res.success == true) {
        this.form.reset()
        this.getUsers()
        this.toastr.success("", res.message)
      }
      else {
        this.toastr.error("", res.message)
      }

    }, (error) => {
      this.toastr.error("", error.error.message)
    })

  }
}
