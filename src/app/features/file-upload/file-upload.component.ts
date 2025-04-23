import { Component, inject, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  selectedFile = signal<File | null>(null);
  uploadStatus = signal<string>('');

  private messageService: MessageService = inject(MessageService); // In context

  constructor() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.selectedFile.set(input.files[0]);
    }
  }

  uploadFile() {
    if (this.selectedFile()) {
      this.messageService.uploadFile(this.selectedFile()!).subscribe({
        next: (response) => this.uploadStatus.set('Upload successful!'),
        error: () => this.uploadStatus.set('Upload failed!'),
      });
      this.selectedFile.set(null);
    }
  }
}
