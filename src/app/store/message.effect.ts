import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesFailure,
  uploadFile,
  uploadFileSuccess,
  uploadFileFailure,
} from './message.actions';
import { MessageService } from '../core/services/message.service';

@Injectable()
export class MessageEffects {
  private actions$ = inject(Actions);
  private messageService = inject(MessageService);

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      mergeMap(() =>
        this.messageService.getMessages().pipe(
          map((messages) => loadMessagesSuccess({ messages })),
          catchError((error) =>
            of(loadMessagesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadFile),
      tap(() => console.log('Uploading file...')),
      mergeMap((action) =>
        this.messageService.uploadFile(action.file).pipe(
          map((response) =>
            uploadFileSuccess({ fileUrl: response.fileUrl || '' })
          ),
          catchError((error) => of(uploadFileFailure({ error: error.message })))
        )
      )
    )
  );

  constructor() {}
}
