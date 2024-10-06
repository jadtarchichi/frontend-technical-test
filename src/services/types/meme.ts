import { GetUserByIdResponse } from "./user";

export type MemeFeed = {
  id: string;
  authorId: string;
  pictureUrl: string;
  description: string;
  commentsCount: string;
  author?: GetUserByIdResponse,
  texts: {
    content: string;
    x: number;
    y: number;
  }[];
  createdAt: string;
}

export type GetMemesResponse = {
  total: number;
  pageSize: number;
  results: Array<MemeFeed>
}

export type Comment = {
  id: string;
  authorId: string;
  memeId: string;
  content: string;
  createdAt: string;
  author?: GetUserByIdResponse;
}

export type GetMemeCommentsResponse = {
  total: number;
  pageSize: number;
  results: Array<Comment>
}

export type CreateCommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  memeId: string;
}

export type Caption = {
  content: string;
  x: number;
  y: number;
}

export type OnDragText = (textIndex: number, x: number, y: number) => void

export type MemePictureProps = {
  pictureUrl: string;
  texts: Array<Caption>;
  dataTestId?: string;
  OnDragText?: OnDragText;
};

export type Picture = {
  url: string;
  file: File;
};
