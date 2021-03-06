import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from "@ionic-native/camera-preview";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery";

import { SocketService } from "./services/socket/socket.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CameraPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CameraPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CameraPreview,
    SocketService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
