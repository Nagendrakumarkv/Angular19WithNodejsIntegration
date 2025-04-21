import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  {
    path: 'messages',
    loadComponent: () =>
      import('./features/messages/messages.component').then(
        (m) => m.MessagesComponent
      ),
  },
];
