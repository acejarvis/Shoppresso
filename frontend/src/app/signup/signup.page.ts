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
  password;
  email;
  home;
  work;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  handleNameValue() {
    this.userService.verifyUsername(this.username).subscribe(res => {
      if (res === "Invalid") {

      }
    });
  }


}
