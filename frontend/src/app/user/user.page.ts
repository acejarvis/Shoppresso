import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  home = this.userService.currentUserHome;
  work = this.userService.currentUserWork;
  editHome = false;
  editWork = false;

  ngOnInit() {
  }

  saveAddress() {
    this.userService.changeHomeAddress(this.home).subscribe(res => { });
    this.userService.changeWorkAddress(this.work).subscribe(res => { });
    this.router.navigateByUrl('tabs/tabs/tab1');
  }

}
