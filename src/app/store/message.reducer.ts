// src/app/store/message.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  initialState,
  MessageState,
  UploadState,
  AppState,
} from './message.state';
import {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesFailure,
  uploadFile,
  uploadFileSuccess,
  uploadFileFailure,
  resetUploadStatus,
} from './message.actions';

export const messageReducer = createReducer(
  initialState.messages,
  on(loadMessages, (state) => ({ ...state, loading: true, error: null })),
  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false,
    error: null,
  })),
  on(loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const uploadReducer = createReducer(
  initialState.upload,
  on(uploadFile, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: null,
    fileUrl: null,
  })),
  on(uploadFileSuccess, (state, { fileUrl }) => ({
    ...state,
    loading: false,
    success: true,
    fileUrl,
    error: null,
  })),
  on(uploadFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error,
  })),
  on(resetUploadStatus, (state) => initialState.upload)
);
