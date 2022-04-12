import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css']
})
export class UsertypeComponent implements OnInit {


  form: FormGroup;
  userTypeList: any = [];
  constructor(private service: AuthService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllUserType()
    this.form = this.fb.group({
      name: [""]
    })
  }

  addUserType() {
    this.service.saveUserType(this.form.value).subscribe(res => {
      this.getAllUserType()

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

  getAllUserType() {
    this.service.getAllUserType().subscribe(res => {
      // console.log(res);
      this.userTypeList = res
    })
  }

  deleteUserType(id: any) {
    this.service.deleteUserType(id).subscribe((res: any) => {
      this.getAllUserType()
      this.toastr.success("", res.message)
    })
  }

}
