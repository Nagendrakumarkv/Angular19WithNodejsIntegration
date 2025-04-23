import { Component, inject, signal } from '@angular/core';
import { MessageService } from '../../core/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  messages = signal<any[]>([]); // Replace 'any' with a proper interface later

  private messageService: MessageService = inject(MessageService); // In context

  constructor() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe((data) => {
      this.messages.set(data);
    });
  }
}
