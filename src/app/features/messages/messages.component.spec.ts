import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { Message } from '../../core/models/message.model';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy('select').and.callFake((selector: any) => {
        if (selector.toString().includes('messages')) return of([]);
        if (selector.toString().includes('loading')) return of(false);
        if (selector.toString().includes('error')) return of(null);
        return of(null);
      }),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, DateFormatPipe, MessagesComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMessages on init', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: '[Messages] Load Messages',
    });
  });

  it('should render loading state', () => {
    mockStore.select.and.callFake((selector: any) => {
      if (selector.toString().includes('loading')) return of(true);
      return of(null);
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toBe(
      'Loading messages...'
    );
  });

  it('should render messages when loaded', () => {
    const mockMessages: Message[] = [
      { id: '1', text: 'Hello', createdAt: new Date(), fileUrl: '' },
    ];
    mockStore.select.and.callFake((selector: any) => {
      if (selector.toString().includes('messages')) return of(mockMessages);
      if (selector.toString().includes('loading')) return of(false);
      if (selector.toString().includes('error')) return of(null);
      return of(null);
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('b').textContent).toBe('Hello');
  });
});
