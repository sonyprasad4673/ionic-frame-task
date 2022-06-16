/* eslint-disable @typescript-eslint/member-ordering */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

loginForm = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',[Validators.required])
});
  constructor(private router: Router,
    public authService: AuthenticationService,) { }

  ngOnInit(): void {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['tips']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // get email() {
  //   return this.loginForm.get('emailId');
  // }
  // get password() {
  //   return this.loginForm.get('password');
  // }

  // navigateToLoginPage(){
  //   this.router.navigate(['get-started']);
  //    }

  //    navigateToSignUp(){
  //     this.router.navigate(['sign-up']);
  //      }

}
