import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  submitted: boolean
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
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

    this.authService.login(this.form.value).subscribe((res: any) => {
      this.submitted = false
      console.log(res);

      if (res.success == true) {
        this.toastr.success("", res.message)
        sessionStorage.setItem('loggedInUser', JSON.stringify(res.user));
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['support'])
      }
      else {
        this.toastr.error("", res.message)
      }
    })

  }
}
