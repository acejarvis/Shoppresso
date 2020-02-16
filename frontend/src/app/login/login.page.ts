import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private userService: UserService, private router: Router) { }
  username;
  password;
  ngOnInit() {
  }
  login() {
    this.userService.login(this.username, this.password).subscribe(response => {
      if (response === 'Login Succeed') {
        this.router.navigateByUrl('');
        this.userService.getCurrentUser().subscribe(res => {
          this.userService.currentUser = res.username;
          this.userService.currentUserEmail = res.email;
          this.userService.currentUserHome = res.address[0].address;
          this.userService.currentUserWork = res.address[1].address;
        });
      }
    });
  }
}
