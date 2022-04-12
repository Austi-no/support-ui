import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  form: FormGroup;
  branchList: any = [];
  constructor(private service: ApiService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllBranch()
    this.form = this.fb.group({
      name: [""],
      organisation: ['']
    })
  }

  addBranch() {
    this.form.get('organisation').setValue(this.loggedInUser.organisation.name);
    this.service.saveBranch(this.form.value).subscribe((res: any) => {
      this.getAllBranch()

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

  getAllBranch() {
    this.service.getAllBranches().subscribe((res: any) => {
      console.log(res);
      this.branchList = res.filter(x => x.organisation.name === this.loggedInUser.organisation.name);
    })
  }

  deleteBranch(id: any) {
    this.service.deleteBranch(id).subscribe((res: any) => {
      this.getAllBranch()
      this.toastr.success("", res.message)
    })
  }

}
