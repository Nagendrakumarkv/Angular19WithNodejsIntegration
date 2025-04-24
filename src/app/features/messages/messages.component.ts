import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/message.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { Message } from '../../core/models/message.model';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  protected messages = signal<Message[]>([]);
  private messageService = inject(MessageService);
  private webSocketService = inject(WebSocketService);

  constructor() {
    this.loadMessages();
    this.loadLiveMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({
      next: (data) => this.messages.set(data),
      error: (err) => console.error('Error loading messages:', err),
    });
  }

  loadLiveMessages() {
    this.webSocketService.getMessages().subscribe((message) => {
      this.messages.update((msgs) => [...msgs, message]);
    });
  }
}
