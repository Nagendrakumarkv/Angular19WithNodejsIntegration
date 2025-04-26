import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket = io(environment.apiUrl);

  getMessages(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('messageUpdate', (message: Message) => {
        observer.next(message);
      });
      return () => this.socket.disconnect();
    });
  }

  sendMessage(message: Message) {
    this.socket.emit('newMessage', message);
  }
}
