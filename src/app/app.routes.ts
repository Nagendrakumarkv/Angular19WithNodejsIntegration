import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'messages',
    loadComponent: () =>
      import('./features/messages/messages.component').then(
        (m) => m.MessagesComponent
      ),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/file-upload/file-upload.component').then(
        (m) => m.FileUploadComponent
      ),
  },
];
