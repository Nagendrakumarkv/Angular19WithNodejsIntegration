import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/message.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <input placeholder="Username" [(ngModel)]="username" /><br />
    <input
      type="password"
      placeholder="Password"
      [(ngModel)]="password"
    /><br />
    <button (click)="login()">Login</button>
    <br /><br />
    <a [href]="baseUrl + '/auth/google'">Login with Google</a>
    <p *ngIf="errorMessage()">{{ errorMessage() }}</p>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: 20px;
      }
    `,
  ],
})
export class LoginComponent {
  protected username = signal('');
  protected password = signal('');
  protected errorMessage = signal('');
  protected baseUrl = environment.apiUrl;

  private messageService = inject(MessageService);
  private router = inject(Router);

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('jwt_token', token);
      this.router.navigate(['/messages']);
    }
  }

  login() {
    this.messageService.login(this.username(), this.password()).subscribe({
      next: () => this.router.navigate(['/messages']),
      error: (err) =>
        this.errorMessage.set(err.error.message || 'Login failed'),
    });
  }
}
