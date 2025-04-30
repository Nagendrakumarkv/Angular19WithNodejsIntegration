import { Message } from '../core/models/message.model';

export interface UploadState {
  loading: boolean;
  success: boolean;
  error: string | null;
  fileUrl: string | null;
}

export interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  messages: MessageState;
  upload: UploadState;
}

export const initialMessageState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

export const initialUploadState: UploadState = {
  loading: false,
  success: false,
  error: null,
  fileUrl: null,
};

export const initialState: AppState = {
  messages: initialMessageState,
  upload: initialUploadState,
};
