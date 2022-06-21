import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {}

}
