import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocketService} from "../../app/services/socket/socket.service";
import {NavController} from "ionic-angular";
import {CameraPage} from "../camera/camera";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              public navCtrl: NavController,
              private socketService: SocketService,) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
      contactUrl: ['', Validators.required]
    })
  }

  public onSubmit() {
    this.form.markAsTouched();
    const url: string = this.form.get('contactUrl').value;
    this.socketService.connect(url);
    this.navCtrl.push(CameraPage);
  }
}
