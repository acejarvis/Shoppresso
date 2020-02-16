import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }


  ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openMenu() {
    this.menu.open('menu');
  }


  logout() {
    this.userService.logout().subscribe(response => {
      if (response === 'ok') {
        this.router.navigateByUrl('/login');
        this.userService.getCurrentUser().subscribe(res => {
          this.userService.currentUser = res.username;
        });
      }
    });
  }
}
