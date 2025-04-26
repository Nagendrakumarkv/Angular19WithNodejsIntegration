import { Component, inject, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  protected selectedFile = signal<File | null>(null);
  protected uploadStatus = signal<string>('');

  private messageService = inject(MessageService);
  private router = inject(Router);

  constructor() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.selectedFile.set(input.files[0]);
    }
  }

  uploadFile() {
    if (this.selectedFile()) {
      this.uploadStatus.set('Uploading...');
      this.messageService.uploadFile(this.selectedFile()!).subscribe({
        next: (response) => {
          this.uploadStatus.set('Upload successful!');
          this.selectedFile.set(null);
        },
        error: (err) => {
          this.uploadStatus.set('Upload failed: ' + err.message);
          console.error('Upload error:', err);
        },
      });
    }
  }

  onGoToMessageListClick() {
    this.router.navigate(['/messages']);
  }
}
