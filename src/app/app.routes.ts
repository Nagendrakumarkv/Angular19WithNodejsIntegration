import { Routes } from '@angular/router';
import { MessagesComponent } from './features/messages/messages.component';
import { FileUploadComponent } from './features/file-upload/file-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'upload', component: FileUploadComponent },
];
