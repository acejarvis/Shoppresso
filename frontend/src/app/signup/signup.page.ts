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

  createUser() {
    this.userService.newUser(this.username, this.password, this.email, this.home, this.work).subscribe(res => {
      if (res === 'Username/Email has been taken.') {

      } else {
        this.router.navigateByUrl('login');
      }
    });
  }


}
