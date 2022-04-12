import { AuthService } from './../service/auth.service';
import { ToastService } from 'angular-toastify';
import { CustomValidationService } from './../validator/custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted: boolean
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService, private fb: FormBuilder, private validationService: CustomValidationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      organisation: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {
      validator: this.validationService.MatchPassword('password', 'confirmPassword'),

    })
  }

  register() {
    this.submitted = true
    if (this.form.invalid || this.form.errors) {

      const invalid = [];
      const controls = this.form.controls;
      this.submitted = false
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }

      this.toastr.error('The Following fields are Invalid: ' + invalid, 'Invalid Fields');
      return;

    }

    this.form.removeControl('confirmPassword')
    this.authService.register(this.form.value).subscribe((res: any) => {
      this.submitted = false
      console.log(res);
      if (res.success == true) {
        this.toastr.success('', res.message)
      } else {
        this.toastr.error('', res.message)
      }

    }, (error: any) => {
      this.submitted = false
      this.toastr.error('', error.error.message)
    })


  }
}
