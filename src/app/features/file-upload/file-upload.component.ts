import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/message.state';
import { uploadFile } from '../../store/message.actions';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  protected selectedFile = signal<File | null>(null);
  protected loading$: Observable<boolean>;
  protected success$: Observable<boolean>;
  protected error$: Observable<string | null>;
  protected fileUrl$: Observable<string | null>;
  protected showSuccess$: Observable<boolean>;

  private router = inject(Router);
  private store = inject(Store<AppState>);

  constructor() {
    this.loading$ = this.store.select((state) => state.upload.loading);
    this.success$ = this.store.select((state) => state.upload.success);
    this.error$ = this.store.select((state) => state.upload.error);
    this.fileUrl$ = this.store.select((state) => state.upload.fileUrl);
    this.showSuccess$ = combineLatest([this.success$, this.fileUrl$]).pipe(
      map(([success, fileUrl]) => success && !!fileUrl)
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.selectedFile.set(input.files[0]);
    }
  }

  uploadFile() {
    if (this.selectedFile()) {
      this.store.dispatch(uploadFile({ file: this.selectedFile()! }));
      this.store.dispatch(resetUploadStatus()); // Optional: Reset after upload
    }
  }

  onGoToMessageListClick() {
    this.router.navigate(['/messages']);
  }
}
function resetUploadStatus(): any {
  throw new Error('Function not implemented.');
}
