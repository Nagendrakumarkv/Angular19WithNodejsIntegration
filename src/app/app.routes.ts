import { Routes } from '@angular/router';
import { MessagesComponent } from './features/messages/messages.component';
import { FileUploadComponent } from './features/file-upload/file-upload.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'upload', component: FileUploadComponent },
];
