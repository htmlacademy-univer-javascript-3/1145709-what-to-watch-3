export type FilmComment = {
  id: number;
  date: string;
  user: string;
  comment: string;
  rating: number;
}

export type PostCommentData = {
  id: string;
  form: {
    comment: string;
    rating: number;
  };
}
