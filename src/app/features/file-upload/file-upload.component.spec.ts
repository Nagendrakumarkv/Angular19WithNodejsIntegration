import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy('select').and.callFake((selector: any) => {
        if (selector.toString().includes('loading')) return of(false); // Default: loading$ is false
        if (selector.toString().includes('success')) return of(false);
        if (selector.toString().includes('error')) return of(null);
        if (selector.toString().includes('fileUrl')) return of(null);
        return of(null);
      }),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FileUploadComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable upload button when loading', () => {
    // Mock only the loading$ selector to return true
    mockStore.select.and.callFake((selector: any) => {
      if (selector.toString().includes('loading')) return of(true);
      if (selector.toString().includes('success')) return of(false);
      if (selector.toString().includes('error')) return of(null);
      if (selector.toString().includes('fileUrl')) return of(null);
      return of(null);
    });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should dispatch uploadFile action on upload', () => {
    const mockFile = new File([''], 'test.txt');
    component.selectedFile.set(mockFile);
    component.uploadFile();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Upload] Upload File',
        file: mockFile,
      })
    );
  });
});
