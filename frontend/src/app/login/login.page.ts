import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogined = false;
  constructor(private userService: UserService, private router: Router) { }
  username = 'user2';
  password = '123456';
  ngOnInit() {
  }
  login() {
    this.isLogined = true;
    this.userService.login(this.username, this.password).subscribe(response => {
      console.log(response);
      if (response === 'Login Succeed') {
        this.isLogined = false;
        this.router.navigateByUrl('');
      }
    });
  }
}
