import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router,public authService: AuthenticationService) { }

  ngOnInit() {}


signUp(email, password,){
  this.authService.RegisterUser(email.value, password.value)
  .then((res) => {
    // Do something here

    this.router.navigate(['verify-email']);
  }).catch((error) => {
    window.alert(error.message);
  });
}

}
