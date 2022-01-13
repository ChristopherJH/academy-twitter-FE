export default interface CommentType {
  comment_id: number;
  date: string;
  body: string;
  user_id: number;
  recommendation_id: number;
  is_like: boolean;
  is_dislike: boolean;
}
