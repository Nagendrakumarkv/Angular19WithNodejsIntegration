import { createAction, props } from '@ngrx/store';
import { Message } from '../core/models/message.model';

// message actions
export const loadMessages = createAction('[Messages] Load Messages');
export const loadMessagesSuccess = createAction(
  '[Messages] Load Messages Success',
  props<{ messages: Message[] }>()
);
export const loadMessagesFailure = createAction(
  '[Messages] Load Messages Failure',
  props<{ error: string }>()
);

// upload actions
export const uploadFile = createAction(
  '[Upload] Upload File',
  props<{ file: File }>()
);
export const uploadFileSuccess = createAction(
  '[Upload] Upload File Success',
  props<{ fileUrl: string }>()
);
export const uploadFileFailure = createAction(
  '[Upload] Upload File Failure',
  props<{ error: string }>()
);
export const resetUploadStatus = createAction('[Upload] Reset Upload Status');
