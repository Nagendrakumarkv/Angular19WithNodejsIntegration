import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../core/services/websocket.service';
import { Message } from '../../core/models/message.model';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMessages } from '../../store/message.actions';
import { Observable } from 'rxjs';
import { AppState } from '../../store/message.state';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  protected messages = signal<Message[]>([]);
  protected loading$: Observable<boolean> | undefined;
  protected error$: Observable<string | null> | undefined;

  private webSocketService = inject(WebSocketService);
  private router = inject(Router);
  private store = inject(Store<AppState>);

  constructor() {
    this.loadLiveMessages();
    this.loadStore();
  }

  loadLiveMessages() {
    this.webSocketService.getMessages().subscribe((message) => {
      this.messages.update((msgs) => [...msgs, message]);
      this.store.dispatch(loadMessages());
    });
  }

  loadStore() {
    this.store
      .select((state) => state.messages.messages)
      .subscribe((messages) => {
        this.messages.set(messages);
      });
    this.loading$ = this.store.select((state) => state.messages.loading);
    this.error$ = this.store.select((state) => state.messages.error);
    this.store.dispatch(loadMessages());
  }

  onGoToFileUploadClick() {
    this.router.navigate(['/upload']);
  }
}
