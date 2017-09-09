import {Injectable} from "@angular/core";
import * as io from 'socket.io-client';
import Socket = SocketIO.Socket;

@Injectable()
export class SocketService {
  public socket: Socket;
  public isConnected: boolean = false;
  public wasDisconnected: boolean = false;

  public connect(connectionUrl: string): void {
    this.socket = io(connectionUrl);

    this.isConnected = true;

    this.socket.on('connect_error', function(err) {
      console.log('error');

      this.isConnected = false;
      this.wasDisconnected = true;
    });
  }

  public subscribeOnShot(shotCallBack: Function): void {
    this.socket.on('shot', (data) => {
      if (shotCallBack) {
        shotCallBack(data.timestamp);
      }
    });
  }

  public emitShot(): void {
    this.socket.emit('shot');
  }

  public disconnect(): void {
    console.log('disconnected');
    this.socket.disconnect();

    this.isConnected = false;
  }

  public sendShot(msg, timestamp): void {
    this.socket.emit('loadPic', {imgBase: msg, timestamp: timestamp});
    console.log('shot sent');
  }
}
