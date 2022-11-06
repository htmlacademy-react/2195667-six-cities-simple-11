export type CommentUser = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type Comment = {
  id: number;
  user: CommentUser;
  rating: number;
  comment: string;
  date: string;
}

export type Comments = Comment[]
