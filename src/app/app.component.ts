import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SocketService} from "./services/socket/socket.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private socketService: SocketService,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Connect', component: HomePage },
      { title: 'Take shot', component: CameraPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if ((page.component === CameraPage) && !this.socketService.isConnected) {
      this.menu.close();
      this.nav.setRoot(HomePage);
      alert('You should connect first');

      return;
    }
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
