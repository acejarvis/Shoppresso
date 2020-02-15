import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogined = false;
  constructor() { }

  ngOnInit() {
  } 
  login() {
    this.isLogined = true;
}
}
