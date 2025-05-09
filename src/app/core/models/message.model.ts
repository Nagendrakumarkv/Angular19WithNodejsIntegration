export interface Message {
  id?: string;
  text: string;
  user?: string;
  createdAt: Date;
  fileUrl?: string;
  fileKey?: string;
}
