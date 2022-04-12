import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-call-type',
  templateUrl: './call-type.component.html',
  styleUrls: ['./call-type.component.css']
})
export class CallTypeComponent implements OnInit {

  form: FormGroup;
  callTypeList: any = [];
  constructor(private service: ApiService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAll()
    this.form = this.fb.group({
      name: [""]
    })
  }

  create() {
    this.service.createCallType(this.form.value).subscribe(res => {
      this.getAll()

      if (res.success == true) {
        this.form.reset()
        this.getAll()
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

  getAll() {
    this.service.getAllCallTypes().subscribe(res => {
      // console.log(res);
      this.callTypeList = res
    })
  }

  update(data: any) {
    this.form.patchValue(data);
  }
  deleteCallType(id: any) {
    this.service.deleteCallType(id).subscribe((res: any) => {
      this.getAll()
      this.toastr.success("", res.message)
    })
  }

}
