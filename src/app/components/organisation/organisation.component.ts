import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

  form: FormGroup;
  organisationList: any = [];
  constructor(private service: ApiService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllOrganisation()
    this.form = this.fb.group({
      name: [""]
    })
  }

  addOrganisation() {
    this.service.saveOrganisation(this.form.value).subscribe(res => {
      this.getAllOrganisation()

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

  getAllOrganisation() {
    this.service.getAllOrganisations().subscribe(res => {
      // console.log(res);
      this.organisationList = res
    })
  }

  deleteOrganisation(id: any) {
    this.service.deleteOrganisation(id).subscribe((res: any) => {
      this.getAllOrganisation()
      this.toastr.success("", res.message)
    })
  }

}
