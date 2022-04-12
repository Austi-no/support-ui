import { ApiService } from './../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidationService } from '../validator/custom-validators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  userList: any = [];
  form: FormGroup;
  organisationList: any = [];
  userTypeList: any = [];

  constructor(private authService: AuthService, private apiService: ApiService, private toastr: ToastrService, private fb: FormBuilder, private validationService: CustomValidationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      organisation: ['Select Organisation', Validators.required],
      userType: ['Select User Type', Validators.required],
      password: ['', [Validators.required]],
      // createdBy: ['']
    })
    this.getUsers()
    this.getOrganisation()
    this.getUserType()
  }
  getUsers() {
    this.authService.getUsers().subscribe((res: any) => {
      this.userList = res
    })
  }
  getOrganisation() {
    this.apiService.getAllOrganisations().subscribe((res: any) => {
      this.organisationList = res
    })
  }

  getUserType() {
    this.authService.getAllUserType().subscribe((res: any) => {
      this.userTypeList = res
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
    this.authService.saveClientAdmin(this.form.value).subscribe((res: any) => {
      console.log(res);
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
