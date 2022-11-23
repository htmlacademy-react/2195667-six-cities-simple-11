export type CommentUser = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type Comment = {
  rating: number;
  comment: string;
  id: number;
  user: CommentUser;
  date: string;
}

export type CommentData = {
  offerId: number;
  comment: string;
  rating: number;
}

export type Comments = Comment[]
