import {Injectable} from "@angular/core";
import * as io from 'socket.io-client';
import Socket = SocketIO.Socket;

import {ShotCallbackInterface} from "./shotCallback.interface";

@Injectable()
export class SocketService {
  private socket: Socket;
  public isConnected: boolean = false;

  public shotCallBack: ShotCallbackInterface = () => {};

  public connect(connectionUrl: string): void {
    this.socket = io(connectionUrl);

    this.socket.on('shot', (msg) => {
      if (this.shotCallBack) {
        this.shotCallBack(msg);
      }
      console.log("shot", msg);
    });
  }

  public disconnect(): void {
    if (this.socket && this.socket.disconnected) {
      return;
    }

    this.socket.disconnect();
  }

  public sendShot(msg): void {
    if (msg) {
      this.socket.emit('shot', msg);
    } else {
      console.warn('message not defined')
    }
  }
}
