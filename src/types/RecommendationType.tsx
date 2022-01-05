export default interface RecommendationType {
  recommendation_id: number;
  title: string;
  author: string;
  url: string;
  description: string;
  content: string;
  time: string;
  recommended_description: string;
  recommended: string;
  likes: number;
  dislikes: number;
  user_id: number;
  stage_id: number;
}
