import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.html'
})
export class CameraPage implements OnInit, OnDestroy, AfterViewInit {
  public selectedItem: any;
  public cameraImage: string;

  public get cameraPreviewOpts(): CameraPreviewOptions {
    return {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      toBack: true,
      previewDrag: false,
      tapPhoto: false,
      alpha: 1
    };
  }

  public get pictureOpts(): CameraPreviewPictureOptions {
      return {
        width: 1280,
        height: 1280,
        quality: 85
      };
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraPreview: CameraPreview,
    private base64ToGallery: Base64ToGallery

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.startCamera();
  }

  public ngOnDestroy(): void {
    this.stopCamera();
  }

  public getPicture(): any {
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.cameraImage = 'data:image/jpeg;base64,' + imageData;
      this.picToGallery(imageData);
    }, (err) => {
      console.log(err);
        // this.cameraImage = 'assets/img/test.jpg';
    });
  }

  public startCamera(): void {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res);
        // this.media();
        // window['location'].reload();
      },
      (err) => {
        console.log(err)
      });
  }

  public stopCamera(): void {
    this.cameraPreview.stopCamera();
  }

  public picToGallery(base64Data) {
    this.base64ToGallery.base64ToGallery(base64Data, { prefix: '_img' }).then(
      res => console.log('Saved image to gallery ', res),
      err => console.log('Error saving image to gallery ', err)
    );
  }

  public media() {
    const constraints = {
      audio: false,
      video: {
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode: {
          exact: "environment"
        },
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream: MediaStream) => {
        const video: HTMLVideoElement = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
  }
}
