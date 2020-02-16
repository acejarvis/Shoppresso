import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username;
  usernamePass = false;
  password;
  email;
  emailPass = false;
  home;
  work;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  handleNameValue() {
    if (this.username === '') {
      this.usernamePass = false;
    } else {
      this.userService.verifyUsername(this.username).subscribe(res => {
        if (res === 'Invalid') {
          this.usernamePass = false;
        } else {
          this.usernamePass = true;
        }
      });
    }
  }

  handleEmailValue() {
    if (this.email === '') {
      this.emailPass = false;
    } else {
      this.userService.verifyEmail(this.email).subscribe(res => {
        if (res === 'Invalid') {
          this.emailPass = false;
        } else {
          this.emailPass = true;
        }
      });
    }
  }


}
