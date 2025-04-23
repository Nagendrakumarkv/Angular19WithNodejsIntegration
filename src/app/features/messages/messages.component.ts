import { Component, inject, signal } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { CommonModule } from '@angular/common';
import { Message } from '../../core/models/message.model';

@Component({
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  protected messages = signal<Message[]>([]);
  private messageService = inject(MessageService);

  constructor() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({
      next: (data) => this.messages.set(data),
      error: (err) => console.error('Error loading messages:', err),
    });
  }
}
